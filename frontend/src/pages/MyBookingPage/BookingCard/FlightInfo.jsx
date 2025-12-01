import { Card, CardContent } from '../../../components/ui/Card';
import { Plane } from 'lucide-react';

const FlightInfo = ({ type, flight, seat }) => {
  const formatDateTime = (dateString, format = 'time') => {
    const date = new Date(dateString);
    if (format === 'time') {
      return date.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else if (format === 'date') {
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    }
  };

  return (
    <Card className="w-full rounded-lg bg-white shadow-sm">
      <CardContent className="p-2 md:p-6">
        <div className="grid grid-cols-3">
          <div className="col-span-3 md:col-span-1">
            {/* Header */}
            <div className="mb-2 flex items-center gap-2 text-gray-600">
              <Plane
                className={`h-5 w-5 ${
                  type === 'outbound' ? 'rotate-0' : 'rotate-180'
                } transition-transform`}
              />
              <span className="text-sm">
                {type === 'outbound' ? 'Chuyến bay đi' : 'Chuyến bay về'}
              </span>
            </div>

            {/* Cities and Date */}
            <div className="mb-8 flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-medium">
                    {flight.origin}
                  </span>
                  <span className="text-xl text-gray-400">›</span>
                  <span className="text-xl font-medium">
                    {flight.destination}
                  </span>
                </div>
                <p className="text-gray-500">
                  {formatDateTime(flight.departure_time, 'date')}
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-3 md:col-span-2 md:border-l-2 md:pl-6">
            {/* Flight Times and Details */}
            <div className="mb-6 grid grid-cols-[1fr,auto,1fr] md:gap-4">
              {/* Departure */}
              <div>
                <h3 className="mb-1 text-gray-600">Khởi hành</h3>
                <p className="mb-2 text-3xl font-bold text-accent-foreground">
                  {formatDateTime(flight.departure_time)}
                </p>
                <div className="space-y-1 text-gray-500">
                  <p>{flight.origin_airport}</p>
                  <p>{flight.origin_country}</p>
                  <p className="text-white">.{flight.origin_terminal}</p>
                </div>
              </div>

              {/* Duration */}
              <div className="flex flex-col items-center justify-center text-sm text-gray-500">
                <span>{flight.duration}</span>
                <span>{flight.stops}</span>
              </div>

              {/* Arrival */}
              <div className="text-right">
                <h3 className="mb-1 text-gray-600">Hạ cánh</h3>
                <p className="mb-2 text-3xl font-bold text-accent-foreground">
                  {formatDateTime(flight.arrival_time)}
                </p>
                <div className="space-y-1 text-gray-500">
                  <p>{flight.destination_airport}</p>
                  <p>{flight.destination_country}</p>
                  <p className="text-white">.{flight.origin_terminal}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Ghế: {seat.seat_type === 'Economy' ? 'Phổ thông' : 'Cao cấp'} {seat.seat_number}</span>
          <div className="text-right">
            <span className={`text-sm font-medium`}>
              Trạng thái chuyến bay: {flight.status}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightInfo;
