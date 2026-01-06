import React from "react";
import { CandidateList } from "../components/CandidateList";
import { CandidateDetails } from "../components/CandidateDetails";

export const Home: React.FC = () => {
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
