import { FC, useState, ChangeEvent } from "react";
import { Dialog } from "@headlessui/react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

interface InviteStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (usn: string, email: string) => void;
}

const InviteStudentModal: FC<InviteStudentModalProps> = ({
  isOpen,
  onClose,
  onInvite,
}) => {
  const [studentData, setStudentData] = useState({ usn: "", email: "" });

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setStudentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!studentData.usn || !studentData.email) {
      alert("Please provide both USN and Email.");
      return;
    }
    onInvite(studentData.usn, studentData.email);
    setStudentData({ usn: "", email: "" });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <div className="fixed inset-0 bg-black bg-opacity-30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-6">
          <Dialog.Title>Invite Student</Dialog.Title>

          <div className="mt-4">
            <Input
              id="usn"
              name="usn"
              label="Student USN"
              placeholder="Enter student USN"
              value={studentData.usn}
              onChange={handleChange}
              className="text-black"
              required
            />
          </div>

          <div className="mt-4">
            <Input
              id="email"
              name="email"
              label="Student Email"
              placeholder="Enter student email"
              value={studentData.email}
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
              Add Student
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default InviteStudentModal;
