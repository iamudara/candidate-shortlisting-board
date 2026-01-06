import React from "react";
import { Badge } from "@/components/ui/badge";
import { type Candidate, CandidateStatus } from "@/data/models/candidate.model";
import { useIsMobile } from "@/presentation/hooks/use-mobile";

interface CandidateDetailsHeaderProps {
  candidate: Candidate;
}

export const CandidateDetailsHeader: React.FC<CandidateDetailsHeaderProps> = ({
  candidate,
}) => {
  const isMobile = useIsMobile();
  const isShortlisted = candidate.status === CandidateStatus.SHORTLISTED;
  const isRejected = candidate.status === CandidateStatus.REJECTED;

  return (
    <div
      className={`border-b bg-gray-50/30 ${
        isMobile ? "pt-12 px-6 pb-6" : "p-6"
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{candidate.name}</h2>
          <div className="flex items-center text-muted-foreground mt-1 gap-2">
            <span className="font-medium text-gray-700">{candidate.role}</span>
            <span>•</span>
            <span>{candidate.experienceLevel}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge
            className={`px-3 py-1 text-sm ${
              isShortlisted
                ? "bg-green-600 hover:bg-green-700"
                : isRejected
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-500"
            }`}
          >
            {candidate.status}
          </Badge>
        </div>
      </div>
    </div>
  );
};
