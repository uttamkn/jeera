import { FC, useState, ChangeEvent } from "react";
import { Dialog } from "@headlessui/react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

interface InviteGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (email: string) => void;
}

const InviteGuideModal: FC<InviteGuideModalProps> = ({
  isOpen,
  onClose,
  onInvite,
}) => {
  const [guideEmail, setGuideEmail] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGuideEmail(e.target.value);
  };

  const handleSubmit = () => {
    if (!guideEmail) {
      alert("Please provide an email.");
      return;
    }
    onInvite(guideEmail);
    setGuideEmail("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <div className="fixed inset-0 bg-black bg-opacity-30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-6">
          <Dialog.Title>Invite Guide</Dialog.Title>

          <div className="mt-4">
            <Input
              id="email"
              name="email"
              label="Guide Email"
              placeholder="Enter guide email"
              value={guideEmail}
              onChange={handleChange}
              className="text-black"
              required
            />
          </div>

          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button className="ml-4" onClick={handleSubmit}>
              Add Guide
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default InviteGuideModal;
