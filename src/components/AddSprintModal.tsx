import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import DateRangePicker from "@/components/ui/DateRangePicker";
import { addSprint } from "@/api/sprint";
import { SprintT } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

interface AddSprintModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

const AddSprintModal: React.FC<AddSprintModalProps> = ({
  isOpen,
  onClose,
  projectId,
}) => {
  const [sprintName, setSprintName] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>();
  const [creatingSprint, setCreatingSprint] = useState(false);
  const [error, setError] = useState("");

  const handleAddSprint = async () => {
    if (!sprintName || !dateRange?.from || !dateRange?.to) {
      alert("Please provide a sprint name and select a complete date range.");
      return;
    }
    setCreatingSprint(true);

    try {
      const newSprint: SprintT = {
        _id: "", // This will be generated by the backend
        name: sprintName,
        projectId: projectId,
        startDate: dateRange.from, // Use the selected start date
        endDate: dateRange.to, // Use the selected end date
        status: "to-do",
        tasks: [],
      };
      await addSprint(newSprint);
      // Reset values after adding sprint
      setSprintName(""); // Clear the sprint name
      setDateRange(undefined); // Clear the date range
      onClose(); // Close the modal
    } catch (err) {
      setError("Failed to add sprint");
    } finally {
      setCreatingSprint(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Sprint</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <label className="block text-sm font-medium">Sprint Name</label>
          <Input
            type="text"
            value={sprintName}
            onChange={(e) => setSprintName(e.target.value)}
            placeholder="Enter sprint name"
            className="mt-2"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Sprint Date Range</label>
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
            className="w-full mt-2"
          />
        </div>

        {/* Show the error message if it exists */}
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

        <div className="mt-6 flex justify-end space-x-2">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={creatingSprint}
          >
            Cancel
          </Button>
          <Button onClick={handleAddSprint} disabled={creatingSprint}>
            {creatingSprint ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" /> Creating...
              </>
            ) : (
              "Add Sprint"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSprintModal;
