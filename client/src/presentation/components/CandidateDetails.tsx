import React, { useState } from "react";
import { useCandidates } from "../hooks/useCandidates";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Separator } from "../../components/ui/separator";
import { Briefcase } from "lucide-react";
import { RejectDialog } from "./RejectDialog";
import { CandidateDetailsHeader } from "./details/CandidateDetailsHeader";
import { CandidateDetailsFooter } from "./details/CandidateDetailsFooter";
import { CandidateDetailsContactInfo } from "./details/CandidateDetailsContactInfo";
import { CandidateDetailsExperience } from "./details/CandidateDetailsExperience";
import { CandidateDetailsEducation } from "./details/CandidateDetailsEducation";

export const CandidateDetails: React.FC = () => {
  const { selectedCandidate, shortlistCandidate, rejectCandidate } =
    useCandidates();

  const [isRejectOpen, setIsRejectOpen] = useState(false);

  if (!selectedCandidate) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-muted-foreground bg-gray-50/50">
        <div className="bg-white p-6 rounded-full shadow-sm mb-4">
          <Briefcase className="h-12 w-12 text-gray-300" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          No Candidate Selected
        </h3>
        <p className="max-w-xs text-center mt-2">
          Select a candidate from the list to view their full profile and take
          action.
        </p>
      </div>
    );
  }

  const handleShortlist = () => {
    shortlistCandidate(selectedCandidate.id);
  };

  const handleConfirmReject = async (note: string) => {
    await rejectCandidate(selectedCandidate.id, note);
    setIsRejectOpen(false);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <CandidateDetailsHeader candidate={selectedCandidate} />

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-8">
          <CandidateDetailsContactInfo candidate={selectedCandidate} />
          <Separator />
          <CandidateDetailsExperience
            experience={selectedCandidate.experience}
          />
          <Separator />
          <CandidateDetailsEducation education={selectedCandidate.education} />
        </div>
      </ScrollArea>

      <CandidateDetailsFooter
        status={selectedCandidate.status}
        onShortlist={handleShortlist}
        onRejectClick={() => setIsRejectOpen(true)}
      />

      <RejectDialog
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        onConfirm={handleConfirmReject}
        candidateName={selectedCandidate.name}
        isShortlisted={false} // Logic handled in footer status check, dialog just needs to know if it's open
      />
    </div>
  );
};
