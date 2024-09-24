import * as React from "react";
import { format, isBefore } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/components/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  className?: string;
}

export default function DateRangePicker({
  value,
  onChange,
  className,
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(value);
  const [error, setError] = React.useState<string | null>(null); // State to track error

  // Handle date selection with validation
  const handleSelect = (selectedRange: DateRange | undefined) => {
    if (selectedRange?.from && selectedRange?.to) {
      // Ensure "from" is before "to"
      if (!isBefore(selectedRange.from, selectedRange.to)) {
        setError("The 'from' date must be earlier than the 'to' date.");
        return;
      }
    }
    setError(null); // Clear the error if valid
    setDate(selectedRange); // Update local state
    if (onChange) {
      onChange(selectedRange); // Call the onChange callback passed from parent
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from && date?.to ? (
              <>
                {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
              </>
            ) : date?.from ? (
              format(date.from, "LLL dd, y") // If only the from date is selected
            ) : (
              <span>Pick a date range</span> // Default placeholder when no date is selected
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-white shadow-md border border-gray-300 rounded-lg"
          align="start"
          side="bottom"
          sideOffset={4}
        >
          <div className="flex space-x-4 p-4">
            {/* First Calendar for "from" date */}
            <Calendar
              initialFocus
              mode="single" // Mode is single because this calendar only picks the "from" date
              selected={date?.from ?? undefined} // Pass the "from" date only
              onSelect={(fromDate) => handleSelect({ from: fromDate, to: date?.to })}
              numberOfMonths={1}
              className="rounded-md border border-gray-300"
            />
            <div className="w-px bg-gray-300" />
            {/* Second Calendar for "to" date */}
            <Calendar
              initialFocus
              mode="single" // Mode is single because this calendar only picks the "to" date
              selected={date?.to ?? undefined} // Pass the "to" date only
              onSelect={(toDate) => handleSelect({ from: date?.from, to: toDate })}
              numberOfMonths={1}
              className="rounded-md border border-gray-300"
            />
          </div>
        </PopoverContent>
      </Popover>

      {/* Show the error message if it exists */}
      {error && (
        <p className="text-red-500 mt-2 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
