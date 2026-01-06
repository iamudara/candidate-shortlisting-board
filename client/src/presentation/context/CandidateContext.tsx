import React, { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  CandidateStatus,
  type Candidate,
} from "../../data/models/candidate.model";
import * as candidateRepository from "../../data/repositories/candidate.repository";

interface CandidateContextType {
  candidates: Candidate[];
  selectedCandidate: Candidate | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  statusFilter: CandidateStatus | "ALL";
  sortOrder: "asc" | "desc";
  sortBy: "createdAt" | "name";

  selectCandidate: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: CandidateStatus | "ALL") => void;
  setSortOrder: (order: "asc" | "desc") => void;
  setSortBy: (field: "createdAt" | "name") => void;
  refreshCandidates: () => Promise<void>;
  shortlistCandidate: (id: string) => Promise<void>;
  rejectCandidate: (id: string, note?: string) => Promise<void>;
}

export const CandidateContext = createContext<CandidateContextType | undefined>(
  undefined
);

export const CandidateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<CandidateStatus | "ALL">(
    "ALL"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<"createdAt" | "name">("createdAt");

  const selectedCandidate =
    candidates.find((c) => c.id === selectedCandidateId) || null;

  const refreshCandidates = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await candidateRepository.fetchCandidates({
        search: searchQuery,
        status: statusFilter,
        sortOrder,
        sortBy,
      });
      setCandidates(response.candidates);

      // If we have a selected candidate but they are no longer in the list (filtered out), deselect
      if (
        selectedCandidateId &&
        !response.candidates.find((c) => c.id === selectedCandidateId)
      ) {
        setSelectedCandidateId(null);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch candidates"
      );
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, statusFilter, sortOrder, sortBy, selectedCandidateId]);

  // Initial fetch and fetch on filter changes
  useEffect(() => {
    refreshCandidates();
  }, [refreshCandidates]);

  const selectCandidate = (id: string | null) => {
    setSelectedCandidateId(id);
  };

  const shortlistCandidate = async (id: string) => {
    // 1. Optimistic Update
    const originalCandidates = [...candidates];
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: CandidateStatus.SHORTLISTED, rejectionNote: null }
          : c
      )
    );

    try {
      // 2. call API
      await candidateRepository.updateCandidateStatus(id, {
        status: CandidateStatus.SHORTLISTED,
      });
      toast.success("Candidate shortlisted successfully");
    } catch (err) {
      // 3. Revert on failure
      setCandidates(originalCandidates);
      const msg = "Failed to shortlist candidate. Please try again.";
      setError(msg);
      toast.error(msg);
      console.error(err);
    }
  };

  const rejectCandidate = async (id: string, note?: string) => {
    // 1. Optimistic Update
    const originalCandidates = [...candidates];
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: CandidateStatus.REJECTED,
              rejectionNote: note || null,
            }
          : c
      )
    );

    try {
      // 2. call API
      await candidateRepository.updateCandidateStatus(id, {
        status: CandidateStatus.REJECTED,
        rejectionNote: note,
      });
      toast.success("Candidate rejected");
    } catch (err) {
      // 3. Revert on failure
      setCandidates(originalCandidates);
      const msg = "Failed to reject candidate. Please try again.";
      setError(msg);
      toast.error(msg);
      console.error(err);
    }
  };

  const value: CandidateContextType = {
    candidates,
    selectedCandidate,
    isLoading,
    error,
    searchQuery,
    statusFilter,
    sortOrder,
    sortBy,
    selectCandidate,
    setSearchQuery,
    setStatusFilter,
    setSortOrder,
    setSortBy,
    refreshCandidates,
    shortlistCandidate,
    rejectCandidate,
  };

  return (
    <CandidateContext.Provider value={value}>
      {children}
    </CandidateContext.Provider>
  );
};
