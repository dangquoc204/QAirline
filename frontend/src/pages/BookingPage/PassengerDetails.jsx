import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import Booking from '../Home/Booking';
import StartPlanning from '../Home/StartPlanning';

export default function PassengerDetails() {
  const navigate = useNavigate();
  const [bookingInfo, setBookingInfo] = useState({
    totalPrice: 0,
    outboundFlight: null,
    returnFlight: null,
  });

  useEffect(() => {
    const stored = sessionStorage.getItem('bookingInfo');
    if (stored) {
      setBookingInfo(JSON.parse(stored));
      sessionStorage.removeItem('bookingInfo');
    }
  }, []);

  const { totalPrice, outboundFlight, returnFlight } = bookingInfo;

  console.log('Total Price:', totalPrice);
  console.log('Outbound Seat ID:', outboundFlight?.seatId);
  console.log('Return Seat ID:', returnFlight?.seatId);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/booking/payment', {
      state: {
        totalPrice,
        outboundFlight: {
          ...outboundFlight,
          seatId: outboundFlight.seatId,
        },
        returnFlight: returnFlight
          ? {
              ...returnFlight,
              seatId: returnFlight.seatId,
            }
          : null,
        passengerDetails: formData,
      },
    });
  };

  return (
    <div className="-mt-11 bg-gray-50 bg-gradient-to-r from-gray-500 to-slate-300">
      <Booking />
      {/* Main */}
      <div className="-mt-20 bg-white sm:px-3 md:h-full md:px-10">
        <div className="container relative z-20 mx-auto -mt-24 px-3 md:px-28 lg:px-16">
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-3 lg:col-span-2">
              <Card className="px-3 py-6 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-center text-xl">Thông tin hành khách</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Họ</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                          required
                          placeholder="Nhập họ"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Tên</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                          required
                          placeholder="Nhập tên"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        placeholder="Nhập email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                        placeholder="Nhập số điện thoại"
                      />
                    </div>
                    <Button type="submit" className="w-full text-white bg-[#ff4d4d] hover:bg-[#c84c4c]">
                      Thanh toán
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            <div className="col-span-3 lg:col-span-1">
              <Card className="rounded-lg border border-gray-200 shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-bold text-[#ff4d4d]">
                    Tóm tắt chuyến đi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Outbound Flight */}
                  {outboundFlight && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-700">
                        Chuyến bay đi
                      </h3>
                      <div className="flex justify-between text-sm font-medium">
                        <div className="w-1/3 text-center">
                          <p className="text-sm text-gray-500">
                            {new Date(outboundFlight.departure_time).toLocaleDateString()
                            }
                          </p>
                          <p className="text-lg font-bold">
                            {format(
                              new Date(outboundFlight.departure_time),
                              'HH:mm'
                            )}
                          </p>
                          <p className="text-sm text-gray-500">
                            {outboundFlight.origin}
                          </p>
                        </div>
                        <div className="flex w-1/3 flex-col items-center justify-center">
                          <span className="text-gray-500">
                            {outboundFlight.duration}
                          </span>
                          <div className="h-px w-full bg-gray-300"></div>
                        </div>
                        <div className="w-1/3 text-center">
                          <p className="text-sm text-gray-500">
                            {new Date(outboundFlight.arrival_time).toLocaleDateString()
                            }
                          </p>
                          <p className="text-lg font-bold">
                            {format(
                              new Date(outboundFlight.arrival_time),
                              'HH:mm'
                            )}
                          </p>
                          <p className="text-sm text-gray-500">
                            {outboundFlight.destination}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Return Flight */}
                  {returnFlight && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-700">
                        Chuyến bay về
                      </h3>
                      <div className="flex justify-between text-sm font-medium">
                        <div className="w-1/3 text-center">
                          <p className="text-sm text-gray-500">
                            {new Date(returnFlight.departure_time).toLocaleDateString()
                            }
                          </p>
                          <p className="text-lg font-bold">
                            {format(
                              new Date(returnFlight.departure_time),
                              'HH:mm'
                            )}
                          </p>
                          <p className="text-sm text-gray-500">
                            {returnFlight.origin}
                          </p>
                        </div>
                        <div className="flex w-1/3 flex-col items-center justify-center">
                          <span className="text-gray-500">
                            {returnFlight.duration}
                          </span>
                          <div className="my-1 h-px w-full bg-gray-300"></div>
                        </div>
                        <div className="w-1/3 text-center">
                          <p className="text-sm text-gray-500">
                            {new Date(returnFlight.arrival_time).toLocaleDateString()
                            }
                          </p>
                          <p className="text-lg font-bold">
                            {format(
                              new Date(returnFlight.arrival_time),
                              'HH:mm'
                            )}
                          </p>
                          <p className="text-sm text-gray-500">
                            {returnFlight.destination}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Total Price */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Tổng giá chuyến đi:</span>
                      <span className="text-xl font-medium">
                        {Number(totalPrice).toFixed(2)} USD
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="py-5">
          <StartPlanning />
        </div>
      </div>
    </div>
  );
}
