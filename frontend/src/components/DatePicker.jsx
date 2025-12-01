import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/PopOver";
import { Calendar } from "./ui/Calendar";
import { format } from "date-fns";

const DatePicker = ({ date, setDate, title = "Chọn ngày" }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
        >
          {date ? format(new Date(date), "dd/MM/yyyy") : title}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date ? new Date(date) : undefined}
          onSelect={(selectedDate) => {
            if (selectedDate) {
              const year = selectedDate.getFullYear();
              const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
              const day = String(selectedDate.getDate()).padStart(2, "0");
              setDate(`${year}-${month}-${day}`);
            } else {
              setDate("");
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
