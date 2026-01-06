import React from "react";
import { Card } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import { type Candidate } from "@/data/models/candidate.model";

interface CandidateDetailsExperienceProps {
  experience: Candidate["experience"];
}

export const CandidateDetailsExperience: React.FC<
  CandidateDetailsExperienceProps
> = ({ experience }) => {
  return (
    <section>
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Briefcase className="h-5 w-5 text-gray-400" />
        Experience
      </h3>
      <div className="space-y-4">
        {experience?.map((exp, index: number) => (
          <Card key={index} className="border-none shadow-none bg-transparent">
            <div className="flex gap-4">
              <div className="mt-1">
                <div className="h-2 w-2 rounded-full bg-gray-300 ring-4 ring-white" />
                {index !== (experience?.length || 0) - 1 && (
                  <div className="w-0.5 h-full bg-gray-200 ml-0.5 mt-2" />
                )}
              </div>
              <div className="pb-6">
                <h4 className="font-medium text-gray-900">{exp.role}</h4>
                <p className="text-sm text-gray-500 mb-2">
                  {exp.company} • {exp.duration}
                </p>
                <p className="text-sm text-gray-600">{exp.description}</p>
              </div>
            </div>
          </Card>
        ))}
        {(!experience || experience.length === 0) && (
          <p className="text-sm text-muted-foreground italic">
            No experience listed.
          </p>
        )}
      </div>
    </section>
  );
};
