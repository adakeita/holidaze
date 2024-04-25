import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingCalendar = ({ onDateChange, initialDate }) => {
  const [startDate, setStartDate] = useState(initialDate || new Date());

  const handleDateChange = (date) => {
    setStartDate(date);
    if (onDateChange) {
      onDateChange(date);
    }
  };

  return (
    <div className="booking-calendar">
      <h3>Select a Date</h3>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        minDate={new Date()}
        inline
      />
    </div>
  );
};

export default BookingCalendar;
