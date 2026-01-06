import React from "react";
import { GraduationCap } from "lucide-react";
import { type Candidate } from "@/data/models/candidate.model";

interface CandidateDetailsEducationProps {
  education: Candidate["education"];
}

export const CandidateDetailsEducation: React.FC<
  CandidateDetailsEducationProps
> = ({ education }) => {
  return (
    <section>
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <GraduationCap className="h-5 w-5 text-gray-400" />
        Education
      </h3>
      <div className="space-y-4">
        {education?.map((edu, index: number) => (
          <div key={index} className="flex gap-4">
            <div className="mt-1">
              <div className="h-2 w-2 rounded-full bg-gray-300 ring-4 ring-white" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{edu.degree}</h4>
              <p className="text-sm text-gray-500">
                {edu.institution} • {edu.year}
              </p>
            </div>
          </div>
        ))}
        {(!education || education.length === 0) && (
          <p className="text-sm text-muted-foreground italic">
            No education listed.
          </p>
        )}
      </div>
    </section>
  );
};
