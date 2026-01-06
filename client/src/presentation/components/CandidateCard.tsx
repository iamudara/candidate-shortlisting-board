import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  CandidateStatus,
  type Candidate,
} from "../../data/models/candidate.model";
import { cn } from "../../lib/utils";
import { Briefcase } from "lucide-react";

interface CandidateCardProps {
  candidate: Candidate;
  isSelected?: boolean;
  onClick: () => void;
}

const statusColors: Record<CandidateStatus, string> = {
  [CandidateStatus.APPLIED]: "bg-gray-500 hover:bg-gray-600",
  [CandidateStatus.SHORTLISTED]: "bg-green-600 hover:bg-green-700",
  [CandidateStatus.REJECTED]: "bg-red-600 hover:bg-red-700",
};

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  isSelected,
  onClick,
}) => {
  const isRejected = candidate.status === CandidateStatus.REJECTED;
  const displayedSkills = candidate.skills.slice(0, 3);
  const remainingSkills = candidate.skills.length - 3;

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md border-2",
        isSelected
          ? "border-primary"
          : "border-transparent hover:border-gray-200",
        isRejected && "opacity-60 grayscale-[0.5]",
        "mb-3"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold">
              {candidate.name}
            </CardTitle>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Briefcase className="w-3 h-3 mr-1" />
              {candidate.role} • {candidate.experienceLevel}
            </div>
          </div>
          <Badge
            className={cn(
              "ml-2 whitespace-nowrap",
              statusColors[candidate.status]
            )}
          >
            {candidate.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-3 text-sm">
        {/* Contact Info (Optional for card, but good for quick scan) */}
        <div className="flex flex-col gap-1 mb-3 text-muted-foreground">
          {/* Keeping it simple for the card view as per requirements, 
                 details will cover full contact info. 
                 Maybe just email icon if needed, but requirements focus on Name, Role, Skills, Status.
             */}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1">
          {displayedSkills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="text-xs px-2 py-0 h-6"
            >
              {skill}
            </Badge>
          ))}
          {remainingSkills > 0 && (
            <Badge variant="outline" className="text-xs px-2 py-0 h-6">
              +{remainingSkills}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
