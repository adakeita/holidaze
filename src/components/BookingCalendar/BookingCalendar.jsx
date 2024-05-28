import React, { useState } from "react";
import PropTypes from "prop-types";
import Calendar from "react-calendar";
import "../../styles/react-calendar.css";

const BookingCalendar = ({
  bookedDates,
  onDateChange,
  isInteractive = true,
}) => {
  const [value, setValue] = useState([null, null]);

  const isDateSelectable = (date) => {
    return !bookedDates.some(
      (range) => date >= range.start && date <= range.end
    );
  };

  const handleDateChange = (value) => {
    if (isInteractive) {
      setValue(value);
      onDateChange(value);
    }
  };

  return (
    <div className="BOOKING-CALENDAR_WRAPPER">
      <Calendar
        selectRange={isInteractive}
        value={value}
        onChange={handleDateChange}
        tileDisabled={({ date }) => !isDateSelectable(date)}
        tileClassName={({ date, view }) =>
          !isDateSelectable(date) ? "booked" : null
        }
      />
    </div>
  );
};

BookingCalendar.propTypes = {
  bookedDates: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.instanceOf(Date).isRequired,
      end: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  onDateChange: PropTypes.func,
  isInteractive: PropTypes.bool,
};

export default BookingCalendar;
