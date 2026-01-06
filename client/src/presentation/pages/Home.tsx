import React from "react";
import { CandidateList } from "../components/CandidateList";
import { CandidateDetails } from "../components/CandidateDetails";
import { useIsMobile } from "../hooks/use-mobile";
import { useCandidates } from "../hooks/useCandidates";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

export const Home: React.FC = () => {
  const isMobile = useIsMobile();
  const { selectedCandidate, selectCandidate } = useCandidates();

  if (isMobile) {
    return (
      <div className="h-screen w-full bg-white">
        <CandidateList />
        <Sheet
          open={!!selectedCandidate}
          onOpenChange={(open) => {
            if (!open) selectCandidate(null);
          }}
        >
          <SheetContent side="bottom" className="h-[85vh] p-0 font-sans">
            <SheetTitle className="sr-only">Candidate Details</SheetTitle>
            <div className="h-full">
              <CandidateDetails />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden">
      {/* Left Sidebar - Candidate List */}
      <div className="w-1/3 min-w-[350px] max-w-[500px] border-r border-gray-200 bg-white shadow-sm z-10">
        <CandidateList />
      </div>

      {/* Right Content - Candidate Details */}
      <div className="flex-1 overflow-hidden relative">
        <CandidateDetails />
      </div>
    </div>
  );
};
