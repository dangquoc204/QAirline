import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tab';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/Dialog';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  CheckCircle,
  Luggage,
  Utensils,
  Armchair,
  Briefcase,
  Crown,
} from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { NavbarBooking } from '../../layouts/Navbar/NavbarBooking';
import Footer from '../../layouts/Footer';

function BookingPage() {
  const navigate = useNavigate();
  const location = useLocation(); // Nhận dữ liệu từ location

  const [outgoingFlights, setOutgoingFlights] = useState([]); // Mảng các chuyến bay đi
  const [returnFlights, setReturnFlights] = useState([]); // Mảng các chuyến bay về
  const [outgoingDates, setOutgoingDates] = useState([]); // Mảng ngày chuyến bay đi
  const [returnDates, setReturnDates] = useState([]); // Mảng ngày chuyến bay về
  const [selectedOutgoingDate, setSelectedOutgoingDate] = useState(null); // Ngày chuyến bay đi được chọn
  const [selectedReturnDate, setSelectedReturnDate] = useState(null); // Ngày chuyến bay về được chọn
  const [selectedOutgoingFlight, setSelectedOutgoingFlight] = useState(null); // Chuyến bay đi được chọn
  const [selectedReturnFlight, setSelectedReturnFlight] = useState(null); // Chuyến bay về được chọn
  const [showFareDetails, setShowFareDetails] = useState(false); // Hiển thị dialog fare details
  const [selectedFareType, setSelectedFareType] = useState(''); // Loại ghế đã chọn
  const [isSelectingReturnFlight, setIsSelectingReturnFlight] = useState(false); // State to track if selecting return flight
  const [origin, setOrigin] = useState('Doha'); // Default origin
  const [destination, setDestination] = useState('Al-Baha'); // Default destination
  const [outboundPrice, setOutboundPrice] = useState(0);
  const [returnPrice, setReturnPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0); // State to track total price
  const [passengers] = useState(location.state?.passengers || 1);
  const [searchDeparture, setSearchDeparture] = useState(null);
  const [searchReturnDate, setSearchReturnDate] = useState(null);

  // Lấy dữ liệu chuyến bay từ location.state
  useEffect(() => {
    if (location.state) {
      const { flights, origin, destination, departure, returnDate } = location.state;
      if (flights) {
        setOutgoingFlights(flights.flights.outgoing || flights.flights);
        setReturnFlights(flights.flights.return || []);
      }
      if (origin) setOrigin(origin);
      if (destination) setDestination(destination);

      if (departure) {
        setSearchDeparture(departure);
      }
      if (returnDate) {
        setSearchReturnDate(returnDate);
      }
    }
  }, [location.state]);

  // Tạo mảng outgoingDates và returnDates từ outgoingFlights và returnFlights
  useEffect(() => {
    if (outgoingFlights.length > 0) {
      const outgoingDates = outgoingFlights.map((flight) => {
        const departureDate = new Date(flight.departure_time);
        return departureDate.toISOString().split('T')[0];
      });
      const uniqueOutgoingDates = [...new Set(outgoingDates)];
      uniqueOutgoingDates.sort((a, b) => new Date(a) - new Date(b));
      setOutgoingDates(uniqueOutgoingDates);
      setSelectedOutgoingDate(uniqueOutgoingDates[0]);
    }

    if (returnFlights.length > 0) {
      const returnDates = returnFlights.map((flight) => {
        const returnDate = new Date(flight.departure_time);
        return returnDate.toISOString().split('T')[0];
      });
      const uniqueReturnDates = [...new Set(returnDates)];
      uniqueReturnDates.sort((a, b) => new Date(a) - new Date(b));
      setReturnDates(uniqueReturnDates);
      setSelectedReturnDate(uniqueReturnDates[0]);
    }
  }, [outgoingFlights, returnFlights]);

  const handleSelectFare = (flight, fare) => {
    const selectedSeat = flight.Seats.find((seat) => seat.seat_type.toLowerCase() === fare.toLowerCase());
    if (selectedSeat) {
      if (isSelectingReturnFlight) {
        setSelectedReturnFlight({
          ...flight,
          fare,
          seatId: selectedSeat.id,
        });
        setReturnPrice(Number(selectedSeat.price));
        setOutboundPrice(outboundPrice);
        setTotalPrice(Number(outboundPrice) + Number(selectedSeat.price));
      } else {
        setSelectedOutgoingFlight({
          ...flight,
          fare,
          seatId: selectedSeat.id,
        });
        setOutboundPrice(Number(selectedSeat.price));
        setReturnPrice(returnPrice);
        setTotalPrice(Number(selectedSeat.price) + Number(returnPrice));
      }
      setSelectedFareType(fare); // Lưu loại ghế
      setShowFareDetails(true);
    }
  };

  const handleConfirmBooking = () => {
    if (returnFlights.length > 0 && !isSelectingReturnFlight) {
      setIsSelectingReturnFlight(true);
      setSelectedOutgoingDate(null);
      setShowFareDetails(false);
    } else {
      const bookingInfo = {
        totalPrice: totalPrice,
          outboundFlight: {
            ...selectedOutgoingFlight,
            seatId: selectedOutgoingFlight.seatId, // Pass the seat ID
          },
          returnFlight: selectedReturnFlight
            ? {
                ...selectedReturnFlight,
                seatId: selectedReturnFlight.seatId, // Pass the seat ID if return flight exists
              }
            : null,
      }
      sessionStorage.setItem('bookingInfo', JSON.stringify(bookingInfo));
      navigate('/booking/passenger-details');
    }
  };

  return (
    <div>
      <NavbarBooking origin={origin} destination={destination} outgoingDate={searchDeparture} returnDate={returnFlights.length > 0 ? searchReturnDate : null} passengers={passengers} isSelectingReturnFlight={isSelectingReturnFlight} />
      {/* Main */}
      <div className="h-full px-3 pb-8 pt-28 md:px-10">
        <div className="mb-8">
          <h1 className="text-3xl text-center font-bold mb-4">
            {isSelectingReturnFlight
              ? 'Chọn chuyến bay trở về'
              : 'Chọn chuyến bay khởi hành'}
          </h1>
          <p className="text-xl font-medium text-muted-foreground">
            từ{' '}
            <span className="text-[#ff4d4d]">
              {isSelectingReturnFlight ? destination : origin}
            </span>{' '}
            đến{' '}
            <span className="text-[#ff4d4d]">
              {isSelectingReturnFlight ? origin : destination}
            </span>
          </p>
        </div>
        <div className="mb-8 overflow-x-auto">
          {/* Date picker for outgoing or return flights */}
          {(isSelectingReturnFlight ? returnDates : outgoingDates)?.length >
            0 && (
            <Tabs
              value={
                isSelectingReturnFlight
                  ? selectedReturnDate
                  : selectedOutgoingDate
              }
              onValueChange={
                isSelectingReturnFlight
                  ? setSelectedReturnDate
                  : setSelectedOutgoingDate
              }
            >
              <TabsList className="h-auto w-full gap-0 rounded-t-lg">
                {(isSelectingReturnFlight ? returnDates : outgoingDates).map(
                  (date, index) => (
                    <TabsTrigger
                      key={`${date}-${index}`}
                      value={date}
                      className="flex w-full flex-col items-center gap-1 text-wrap rounded-t-lg p-4 text-center data-[state=active]:border-b-2 data-[state=active]:border-[#ff4d4d]"
                    >
                      <span className="text-sm">
                        {format(new Date(date), 'EEEE, d MMMM', { locale: vi })}
                      </span>
                    </TabsTrigger>
                  )
                )}
              </TabsList>
              {/* Filter and display flights for the selected date */}
              <TabsContent
                value={
                  isSelectingReturnFlight
                    ? selectedReturnDate
                    : selectedOutgoingDate
                }
              >
                {(isSelectingReturnFlight ? returnFlights : outgoingFlights)
                  .filter(
                    (flight) =>
                      new Date(flight.departure_time)
                        .toISOString()
                        .split('T')[0] ===
                      (isSelectingReturnFlight
                        ? selectedReturnDate
                        : selectedOutgoingDate)
                  )
                  .map((flight) => {
                    const economySeat = flight.Seats.find(
                      (seat) => seat.seat_type.toLowerCase() === 'economy'
                    );
                    const premiumSeat = flight.Seats.find(
                      (seat) => seat.seat_type.toLowerCase() === 'premium'
                    );
                    return (
                      <Card key={flight.id} className="mb-3">
                        <CardContent className="p-6">
                          <div className="flex flex-col items-center justify-between md:flex-row">
                            <div className="flex items-center space-x-8">
                              <div>
                                <p className="text-2xl font-bold">
                                  {format(
                                    new Date(flight.departure_time),
                                    'HH:mm'
                                  )}
                                </p>
                                <p className="truncate text-sm text-gray-500">
                                  {flight.origin}
                                </p>
                              </div>
                              <div className="text-sm text-gray-500">
                                {flight.duration}
                              </div>
                              <div>
                                <p className="text-2xl font-bold">
                                  {format(
                                    new Date(flight.arrival_time),
                                    'HH:mm'
                                  )}
                                </p>
                                <p className="truncate text-sm text-gray-500">
                                  {flight.destination}
                                </p>
                              </div>
                            </div>
                            <div className="mt-4 flex space-x-4 md:mt-0">
                              <div className="text-center">
                                <p className="text-sm text-gray-500">Phổ thông</p>
                                <p className="text-lg font-bold">
                                  {economySeat
                                    ? `$${economySeat.price}`
                                    : 'N/A'}
                                </p>
                                <Button
                                  variant="outline"
                                  onClick={() =>
                                    handleSelectFare(flight, 'economy')
                                  }
                                >
                                  Chọn giá vé
                                </Button>
                              </div>
                              <div className="text-center">
                                <p className="text-sm text-gray-500">Cao cấp</p>
                                <p className="text-lg font-bold">
                                  {premiumSeat
                                    ? `$${premiumSeat.price}`
                                    : 'N/A'}
                                </p>
                                <Button
                                  variant="outline"
                                  onClick={() =>
                                    handleSelectFare(flight, 'premium')
                                  }
                                >
                                  Chọn giá vé
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
              </TabsContent>
            </Tabs>
          )}
        </div>
        {/* Fare Details Dialog */}
        <Dialog open={showFareDetails} onOpenChange={setShowFareDetails}>
          <DialogContent
            className={`rounded-lg shadow-lg sm:max-w-[450px] ${
              selectedFareType === 'premium'
                ? 'bg-gradient-to-r from-yellow-500 to-orange-300 text-white'
                : 'bg-white'
            }`}
          >
            <DialogHeader>
              <div className="flex items-center justify-center gap-2">
                <DialogTitle
                  className={`text-lg font-bold ${
                    selectedFareType === 'premium'
                      ? 'text-white'
                      : 'text-gray-800'
                  }`}
                >
                  {selectedFareType === 'economy'
                    ? 'Chi tiết giá vé phổ thông'
                    : 'Chi tiết giá vé cao cấp'}
                </DialogTitle>
                {selectedFareType === 'premium' && (
                  <Crown className="h-6 w-6 text-yellow-300" /> // Thêm icon bên phải
                )}
              </div>
              <DialogDescription
                className={`text-sm ${
                  selectedFareType === 'premium'
                    ? 'text-white'
                    : 'text-gray-500'
                }`}
              >
                Vui lòng kiểm tra chi tiết giá vé đã chọn trước khi tiếp tục
              </DialogDescription>
            </DialogHeader>
            {(selectedOutgoingFlight || selectedReturnFlight) && (
              <div className="space-y-6">
                {/* Flight Details */}
                <div className="space-y-2">
                  <p
                    className={`flex items-center gap-2 font-medium ${
                      selectedFareType === 'premium'
                        ? 'text-white'
                        : 'text-gray-800'
                    }`}
                  >
                    <Briefcase className="h-5 w-5" />
                    Chi tiết chuyến bay
                  </p>
                  <p>
                    {isSelectingReturnFlight && selectedReturnFlight
                      ? `${selectedReturnFlight.origin} → ${selectedReturnFlight.destination}`
                      : selectedOutgoingFlight
                        ? `${selectedOutgoingFlight.origin} → ${selectedOutgoingFlight.destination}`
                        : ''}
                  </p>
                  <p>
                    {format(
                      new Date(
                        isSelectingReturnFlight && selectedReturnFlight
                          ? selectedReturnFlight.departure_time
                          : selectedOutgoingFlight.departure_time
                      ),
                      'HH:mm'
                    )}{' '}
                    -{' '}
                    {format(
                      new Date(
                        isSelectingReturnFlight && selectedReturnFlight
                          ? selectedReturnFlight.arrival_time
                          : selectedOutgoingFlight.arrival_time
                      ),
                      'HH:mm'
                    )}
                  </p>
                </div>

                {/* Included Benefits */}
                <div className="space-y-2">
                  <p
                    className={`flex items-center gap-2 font-medium ${
                      selectedFareType === 'premium'
                        ? 'text-white'
                        : 'text-gray-800'
                    }`}
                  >
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Tiện ích kèm theo
                  </p>
                  <ul
                    className={`space-y-3 pl-4 text-sm ${
                      selectedFareType === 'premium'
                        ? 'text-white'
                        : 'text-gray-600'
                    }`}
                  >
                    <li className="flex items-center gap-2">
                      <Luggage
                        className={`h-5 w-5 ${
                          selectedFareType === 'premium'
                            ? 'text-white'
                            : 'text-blue-500'
                        }`}
                      />
                      Hành lý ký gửi miễn cước
                    </li>
                    <li className="flex items-center gap-2">
                      <Briefcase
                        className={`h-5 w-5 ${
                          selectedFareType === 'premium'
                            ? 'text-white'
                            : 'text-blue-500'
                        }`}
                      />
                      Hành lý xách tay miễn cước
                    </li>
                    <li className="flex items-center gap-2">
                      <Utensils
                        className={`h-5 w-5 ${
                          selectedFareType === 'premium'
                            ? 'text-white'
                            : 'text-yellow-500'
                        }`}
                      />
                      Suất ăn cao cấp miễn phí
                    </li>
                    <li className="flex items-center gap-2">
                      <Armchair
                        className={`h-5 w-5 ${
                          selectedFareType === 'premium'
                            ? 'text-white'
                            : 'text-purple-500'
                        }`}
                      />
                      Ghế rộng và thoải mái hơn
                    </li>
                  </ul>
                </div>

                {/* Confirm Button */}
                <Button
                  className={`w-full ${
                    selectedFareType === 'premium'
                      ? 'bg-yellow-600 text-white hover:bg-yellow-400'
                      : 'bg-[#ff4d4d] text-white hover:bg-[#c84c4c]'
                  }`}
                  onClick={handleConfirmBooking}
                >
                  Xác nhận lựa chọn
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
      {/* Footer */}
      <div className="-mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default BookingPage;
