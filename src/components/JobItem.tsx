import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Check, ChevronDown, ChevronUp, Clipboard } from "lucide-react";
import { Job } from "@/types/Job";
import { Status } from "@/types/Status";

interface JobItemProps {
  job: Job;
  selectedStatus: Status;
}

export const JobItem = ({ job, selectedStatus }: JobItemProps) => {
  const [expandedJob, setExpandedJob] = useState<Set<string>>(new Set());
  const [copiedEmails, setCopiedEmails] = useState<Map<string, boolean>>(
    new Map()
  );
  const toggleDescription = (jobId: string) => {
    setExpandedJob((prev) => {
      const newExpandedJob = new Set(prev);
      if (newExpandedJob.has(jobId)) {
        newExpandedJob.delete(jobId);
      } else {
        newExpandedJob.add(jobId);
      }
      return newExpandedJob;
    });
  };

  const handleCopyEmail = (jobId: string, email: string) => {
    navigator.clipboard.writeText(email).then(() => {
      setCopiedEmails((prev) => new Map(prev).set(jobId, true));
      setTimeout(() => {
        setCopiedEmails((prev) => {
          const newCopiedEmails = new Map(prev);
          newCopiedEmails.set(jobId, false);
          return newCopiedEmails;
        });
      }, 2000);
    });
  };
  return (
    <Card
      key={job.id}
      className={`rounded-xl my-4 border-l-20`}
      style={{ borderLeftColor: selectedStatus.color }}
    >
      <CardHeader>
        <div className="flex flex-col items-start justify-between flex-wrap">
          <div className="flex flex-col">
            <h3 className="text-2xl">{job.title}</h3>
            <p className="font-bold">{job.company}</p>
            <p className="text-indigo-400 -mt-1">{job.location}</p>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex flex-wrap gap-2">
              <Badge className="rounded-full text-sm">{job.type}</Badge>
              <Badge className="rounded-full text-sm bg-amber-400 text-black">
                {job.salary}
              </Badge>
            </div>
            <p className="flex items-center flex-wrap gap-2 text-sm">
              {job.contactEmail}
              <Badge variant="outline" className="rounded-xl text-sm">
                <button
                  onClick={() =>
                    handleCopyEmail(job.id ?? "", job.contactEmail ?? "")
                  }
                >
                  {copiedEmails.get(job.id ?? "") ? (
                    <Check width={15} />
                  ) : (
                    <Clipboard width={15} />
                  )}
                </button>
              </Badge>
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={`transition-all duration-300 overflow-hidden ${
            !expandedJob.has(job.id ?? "") ? "max-h-12" : "max-h-full"
          }`}
        >
          <p>{job.description}</p>
        </div>
        <div className="flex justify-center">
          {job.description.split("\n").length > 3 && (
            <button
              onClick={() => toggleDescription(job.id ?? "")}
              className="mt-4"
            >
              {expandedJob.has(job.id ?? "") ? (
                <div className="flex flex-col items-center">
                  <ChevronDown />
                  <span className="text-sm -mt-2">Réduire</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <ChevronUp />
                  <span className="text-sm -mt-2">Voir plus</span>
                </div>
              )}
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
