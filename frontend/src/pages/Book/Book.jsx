import Booking from "../Home/Booking";
import FlightTab from "../Home/FlightTab/FlightTab";
import StartPlanning from "../Home/StartPlanning";

function Book() {
  return (
    <>
      <div className="relative">
        <Booking />

        <div className="relative z-20 -mt-24">
          <FlightTab />
        </div>
      </div>

      <StartPlanning />
    </>
  )
}

export default Book;