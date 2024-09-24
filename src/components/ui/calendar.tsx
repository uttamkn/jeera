import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/components/utils";

// Define CalendarProps without using DateRange directly
export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  selected?: Date | Date[]; // Change selected to accept a Date or an array of Dates
};

function Calendar({ className, showOutsideDays = true, selected, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 grid grid-cols-1 gap-4", className)} // Adjusted layout
      components={{
        IconLeft: () => <ChevronLeft className="w-4 h-4 text-gray-700" />,
        IconRight: () => <ChevronRight className="w-4 h-4 text-gray-700" />,
      }}
      modifiers={{
        selected: (date) => {
          // Check if selected is a single date or an array of dates
          if (Array.isArray(selected)) {
            return selected.some(
              (selectedDate) => selectedDate instanceof Date && selectedDate.getTime() === date.getTime()
            );
          }
          return selected?.getTime() === date.getTime();
        },
        today: (date) => date.toDateString() === new Date().toDateString(),
      }}
      modifiersClassNames={{
        selected: "bg-blue-500 text-white", // Selected dates
        today: "bg-blue-100 text-blue-600 font-bold", // Today style
        outside: "text-gray-400", // Days outside the month
      }}
      classNames={{
        day: "rounded-full hover:bg-blue-100", // Hover effect for days
        caption: "text-gray-700 font-semibold", // Month name styling
        head_row: "text-gray-500 font-medium", // Weekdays styling
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
