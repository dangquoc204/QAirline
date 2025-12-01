import Booking from "./Booking";
import { FlightDeals } from "./FlightDeals";
import FlightTab from "./FlightTab/FlightTab";
import StartPlanning from "./StartPlanning";
import SuggestionHome from "./SuggestionHome";
import SubscribeForm from "./SubscribeForm";

function Home() {
  return (
    <>
      <div className="relative">
        <Booking />

        <div className="relative z-20 -mt-24">
          <FlightTab />
        </div>
      </div>

      <StartPlanning />
      <FlightDeals />
      <SuggestionHome />
      <SubscribeForm />
    </>
  )
}

export default Home;