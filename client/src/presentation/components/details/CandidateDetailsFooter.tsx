import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { CandidateStatus } from "@/data/models/candidate.model";
import { useIsMobile } from "@/presentation/hooks/use-mobile";

interface CandidateDetailsFooterProps {
  status: CandidateStatus;
  onShortlist: () => void;
  onRejectClick: () => void;
}

export const CandidateDetailsFooter: React.FC<CandidateDetailsFooterProps> = ({
  status,
  onShortlist,
  onRejectClick,
}) => {
  const isMobile = useIsMobile();
  const isShortlisted = status === CandidateStatus.SHORTLISTED;
  const isRejected = status === CandidateStatus.REJECTED;

  return (
    <div
      className={`p-4 border-t bg-gray-50 flex gap-3 ${
        isMobile ? "justify-center" : "justify-end"
      }`}
    >
      <Button
        variant={isRejected ? "outline" : "destructive"}
        onClick={onRejectClick}
        disabled={isRejected}
        className={`focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none ${
          isMobile ? "h-12 mb-2" : ""
        }`}
      >
        <XCircle className="w-4 h-4 mr-2" />
        {isRejected ? "Rejected" : "Reject Candidate"}
      </Button>
      <Button
        onClick={onShortlist}
        disabled={isShortlisted}
        variant={isShortlisted ? "secondary" : "default"}
        className={
          (isShortlisted
            ? "bg-green-100 text-green-800 hover:bg-green-200"
            : "bg-green-600 hover:bg-green-700 text-white") +
          " focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none border-none " +
          (isMobile ? "h-12 mb-2" : "")
        }
      >
        <CheckCircle className="w-4 h-4 mr-2" />
        {isShortlisted ? "Shortlisted" : "Shortlist Candidate"}
      </Button>
    </div>
  );
};
