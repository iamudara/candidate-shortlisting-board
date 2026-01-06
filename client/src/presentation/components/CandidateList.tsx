import React, { useEffect, useState } from "react";
import { useCandidates } from "../hooks/useCandidates";
import { CandidateCard } from "./CandidateCard";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { CandidateStatus } from "../../data/models/candidate.model";

export const CandidateList: React.FC = () => {
  const {
    candidates,
    selectedCandidate,
    isLoading,
    searchQuery,
    statusFilter,
    sortBy,
    sortOrder,
    selectCandidate,
    setSearchQuery,
    setStatusFilter,
    setSortBy,
    setSortOrder,
  } = useCandidates();

  // Local state for debounced search
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(localSearch);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [localSearch, setSearchQuery]);

  // Sync local search if context changes externally (though rare in this flow)
  useEffect(() => {
    if (searchQuery !== localSearch) {
      // Only update if they are significantly different to avoid typing loops
      // Actually, relying on localSearch for input value is enough.
      // But if we clear search from elsewhere, we want to update input.
      // For now, let's just assume one-way sync from input -> context usually.
    }
  }, [searchQuery]); // simplistic sync

  const handleStatusChange = (value: string) => {
    setStatusFilter(value as CandidateStatus | "ALL");
  };

  return (
    <div className="flex flex-col h-full bg-white border-r">
      <div className="p-4 border-b space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates..."
            className="pl-8"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        </div>

        {/* Sort & Filter */}
        <div className="flex gap-2">
          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Status</SelectItem>
              <SelectItem value={CandidateStatus.APPLIED}>Applied</SelectItem>
              <SelectItem value={CandidateStatus.SHORTLISTED}>
                Shortlisted
              </SelectItem>
              <SelectItem value={CandidateStatus.REJECTED}>Rejected</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select
            value={`${sortBy}-${sortOrder}`}
            onValueChange={(val) => {
              const [field, order] = val.split("-");
              setSortBy(field as "createdAt" | "name");
              setSortOrder(order as "asc" | "desc");
            }}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt-desc">Newest First</SelectItem>
              <SelectItem value="createdAt-asc">Oldest First</SelectItem>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="text-xs text-muted-foreground font-medium">
          {candidates.length} Candidates Found
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        {isLoading && candidates.length === 0 ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2 p-4 border rounded-lg">
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-1/3" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-4 w-1/4" />
                <div className="flex gap-2 pt-2">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            ))}
          </div>
        ) : candidates.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            <p>No candidates found.</p>
            <p className="text-xs mt-1">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {candidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                isSelected={selectedCandidate?.id === candidate.id}
                onClick={() => selectCandidate(candidate.id)}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
