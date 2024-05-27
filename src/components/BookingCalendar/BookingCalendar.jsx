import PropTypes from "prop-types";
import Calendar from "react-calendar";
import "../../styles/react-calendar.css"

const BookingCalendar = ({ bookedDates }) => {
  const isDateSelectable = (date) => {
    return !bookedDates.some(
      (range) => date >= range.start && date <= range.end
    );
  };

  return (
    <div className="BOOKING-CALENDAR_WRAPPER">
      <Calendar
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
};

export default BookingCalendar;
