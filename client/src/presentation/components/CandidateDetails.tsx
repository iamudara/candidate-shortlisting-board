import React, { useState } from "react";
import { useCandidates } from "../hooks/useCandidates";
import { useIsMobile } from "../hooks/use-mobile";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Card } from "../../components/ui/card";
import { CandidateStatus } from "../../data/models/candidate.model";
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  CheckCircle,
  XCircle,
  Download,
} from "lucide-react";
import { RejectDialog } from "./RejectDialog";

export const CandidateDetails: React.FC = () => {
  const { selectedCandidate, shortlistCandidate, rejectCandidate } =
    useCandidates();
  const isMobile = useIsMobile();

  const [isRejectOpen, setIsRejectOpen] = useState(false);

  // Placeholder for Reject Dialog state (Task 4.8)
  // const [isRejectOpen, setIsRejectOpen] = useState(false);

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

  const isShortlisted =
    selectedCandidate.status === CandidateStatus.SHORTLISTED;
  const isRejected = selectedCandidate.status === CandidateStatus.REJECTED;

  const handleShortlist = () => {
    shortlistCandidate(selectedCandidate.id);
  };

  const handleRejectClick = () => {
    setIsRejectOpen(true);
  };

  const handleConfirmReject = async (note: string) => {
    await rejectCandidate(selectedCandidate.id, note); // Wait for optimistic/api
    setIsRejectOpen(false);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div
        className={`border-b bg-gray-50/30 ${
          isMobile ? "pt-12 px-6 pb-6" : "p-6"
        }`}
      >
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCandidate.name}
            </h2>
            <div className="flex items-center text-muted-foreground mt-1 gap-2">
              <span className="font-medium text-gray-700">
                {selectedCandidate.role}
              </span>
              <span>•</span>
              <span>{selectedCandidate.experienceLevel}</span>
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
              {selectedCandidate.status}
            </Badge>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-8">
          {/* Rejection Note */}
          {isRejected && selectedCandidate.rejectionNote && (
            <div className="bg-red-50 border border-red-100 rounded-lg p-4 text-red-800 text-sm">
              <h4 className="font-semibold mb-1 flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                Rejection Reason
              </h4>
              <p>{selectedCandidate.rejectionNote}</p>
            </div>
          )}

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 text-sm text-gray-700 p-3 bg-gray-50 rounded-lg border border-gray-100">
              <Mail className="h-4 w-4 text-gray-400" />
              <a
                href={`mailto:${selectedCandidate.email}`}
                className="hover:text-primary hover:underline truncate"
              >
                {selectedCandidate.email}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700 p-3 bg-gray-50 rounded-lg border border-gray-100">
              <Phone className="h-4 w-4 text-gray-400" />
              {selectedCandidate.phone}
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700 p-3 bg-gray-50 rounded-lg border border-gray-100">
              <MapPin className="h-4 w-4 text-gray-400" />
              {selectedCandidate.location}
            </div>
            <div
              className="flex items-center gap-3 text-sm text-gray-700 p-3 bg-gray-50 rounded-lg border border-gray-100 cursor-not-allowed opacity-70"
              title="Resume download mock"
            >
              <Download className="h-4 w-4 text-gray-400" />
              <span>Resume.pdf</span>
            </div>
          </div>

          <Separator />

          {/* About */}
          <section>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              About
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {selectedCandidate.bio}
            </p>
          </section>

          <Separator />

          {/* Skills */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {selectedCandidate.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </section>

          <Separator />

          {/* Experience */}
          <section>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-gray-400" />
              Experience
            </h3>
            <div className="space-y-4">
              {selectedCandidate.experience?.map((exp, index: number) => (
                <Card
                  key={index}
                  className="border-none shadow-none bg-transparent"
                >
                  <div className="flex gap-4">
                    <div className="mt-1">
                      <div className="h-2 w-2 rounded-full bg-gray-300 ring-4 ring-white" />
                      {index !==
                        (selectedCandidate.experience?.length || 0) - 1 && (
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
              {(!selectedCandidate.experience ||
                selectedCandidate.experience.length === 0) && (
                <p className="text-sm text-muted-foreground italic">
                  No experience listed.
                </p>
              )}
            </div>
          </section>

          <Separator />

          {/* Education */}
          <section>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-gray-400" />
              Education
            </h3>
            <div className="space-y-4">
              {selectedCandidate.education?.map((edu, index: number) => (
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
              {(!selectedCandidate.education ||
                selectedCandidate.education.length === 0) && (
                <p className="text-sm text-muted-foreground italic">
                  No education listed.
                </p>
              )}
            </div>
          </section>
        </div>
      </ScrollArea>

      {/* Action Footer */}
      <div className="p-4 border-t bg-gray-50 flex justify-center gap-3">
        <Button
          variant={isRejected ? "outline" : "destructive"}
          onClick={handleRejectClick}
          disabled={isRejected}
          className={`focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none ${
            isMobile ? "h-12 mb-2" : ""
          }`}
        >
          <XCircle className="w-4 h-4 mr-2" />
          {isRejected ? "Rejected" : "Reject Candidate"}
        </Button>
        <Button
          onClick={handleShortlist}
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

      <RejectDialog
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        onConfirm={handleConfirmReject}
        candidateName={selectedCandidate.name}
        isShortlisted={isShortlisted}
      />
    </div>
  );
};
