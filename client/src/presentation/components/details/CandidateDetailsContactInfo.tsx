import React from "react";
import { Mail, Phone, MapPin, Download, XCircle } from "lucide-react";
import { type Candidate, CandidateStatus } from "@/data/models/candidate.model";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface CandidateDetailsContactInfoProps {
  candidate: Candidate;
}

export const CandidateDetailsContactInfo: React.FC<
  CandidateDetailsContactInfoProps
> = ({ candidate }) => {
  const isRejected = candidate.status === CandidateStatus.REJECTED;

  return (
    <div className="space-y-8">
      {/* Rejection Note */}
      {isRejected && candidate.rejectionNote && (
        <div className="bg-red-50 border border-red-100 rounded-lg p-4 text-red-800 text-sm">
          <h4 className="font-semibold mb-1 flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            Rejection Reason
          </h4>
          <p>{candidate.rejectionNote}</p>
        </div>
      )}

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 text-sm text-gray-700 p-3 bg-gray-50 rounded-lg border border-gray-100">
          <Mail className="h-4 w-4 text-gray-400" />
          <a
            href={`mailto:${candidate.email}`}
            className="hover:text-primary hover:underline truncate"
          >
            {candidate.email}
          </a>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-700 p-3 bg-gray-50 rounded-lg border border-gray-100">
          <Phone className="h-4 w-4 text-gray-400" />
          {candidate.phone}
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-700 p-3 bg-gray-50 rounded-lg border border-gray-100">
          <MapPin className="h-4 w-4 text-gray-400" />
          {candidate.location}
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
        <p className="text-gray-600 leading-relaxed text-sm">{candidate.bio}</p>
      </section>

      <Separator />

      {/* Skills */}
      <section>
        <h3 className="text-lg font-semibold mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {candidate.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="px-3 py-1">
              {skill}
            </Badge>
          ))}
        </div>
      </section>
    </div>
  );
};
