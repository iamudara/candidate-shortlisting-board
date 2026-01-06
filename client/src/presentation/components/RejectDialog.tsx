import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";

interface RejectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (note: string) => void;
  candidateName: string;
  isShortlisted?: boolean;
}

export const RejectDialog: React.FC<RejectDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  candidateName,
  isShortlisted,
}) => {
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    onConfirm(note);
    setNote("");
    onClose();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reject Candidate</DialogTitle>
          <DialogDescription>
            Are you sure you want to reject <strong>{candidateName}</strong>?
            {isShortlisted
              ? " They are currently shortlisted. Rejecting them will remove them from the shortlist."
              : " This action cannot be undone."}{" "}
            You can optionally add a note explaining why.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="Reason for rejection (optional)..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="col-span-3 min-h-[100px]"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleSubmit}>
            Reject Candidate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
