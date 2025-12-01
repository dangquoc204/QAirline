import { useState, useEffect } from 'react';
import { Pencil, Trash, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Toaster } from '../../components/ui/Sonner';
import { toast } from 'sonner';
import { Input } from '../../components/ui/Input';
import ConfirmDialog from '../../components/ConfirmDialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/Table';
import DateTimePicker from '../../components/ui/DateTimePicker';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import ResponsiveDialog from '../../components/ui/ResponsiveDialog';

const calculateDuration = (departure, arrival) => {
  const departureTime = new Date(departure);
  const arrivalTime = new Date(arrival);
  const duration = Math.abs(arrivalTime - departureTime) / 36e5; // convert milliseconds to hours
  const hours = Math.floor(duration);
  const minutes = Math.round((duration - hours) * 60);
  return `${hours}h ${minutes}m`;
};

const formatDateTime = (dateTime) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(dateTime).toLocaleDateString(undefined, options);
};

const FlightManagement = () => {
  const [flights, setFlights] = useState([]);
  const [airplaneModels, setAirplaneModels] = useState([]);
  const [newFlight, setNewFlight] = useState({
    flight_number: '',
    origin: '',
    destination: '',
    departure_time: '',
    arrival_time: '',
    status: 'Đã lên lịch',
    aircraft_type: '',
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    action: null,
    title: '',
    message: '',
    onConfirm: null,
  });
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  });
  const token = localStorage.getItem('token');

  const fetchFlights = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/flights');
      const data = await response.json();
      setFlights(data);
      // console.log(data);
    } catch (error) {
      toast.error('Tải chuyến bay thất bại.');
      console.error('Lỗi khi tải chuyến bay:', error);
    }
  };

  const fetchAirplaneModels = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/airplanes/models'
      );
      const data = await response.json();
      setAirplaneModels(data);
    } catch (error) {
      toast.error('Tải máy bay thất bại.');
      console.error('Lỗi khi tải máy bay:', error);
    }
  };

  useEffect(() => {
    fetchFlights();
    fetchAirplaneModels();
  }, []);

  const handleAddFlight = async () => {
    if (
      !newFlight.arrival_time ||
      !newFlight.departure_time ||
      !newFlight.destination ||
      !newFlight.flight_number ||
      !newFlight.origin ||
      !newFlight.aircraft_type
    ) {
      toast.error('Vui lòng điền vào tất cả các ô.');
      return;
    }
    setConfirmDialog({
      isOpen: true,
      title: 'Thêm chuyến bay mới',
      message: 'Bạn có chắc chắn muốn thêm chuyến bay này không?',
      onConfirm: async () => {
        try {
          const response = await fetch('http://localhost:5000/api/admin/flight', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token ? `Bearer ${token}` : ''
            },
            body: JSON.stringify({
              flightNumber: newFlight.flight_number,
              origin: newFlight.origin,
              destination: newFlight.destination,
              departureTime: newFlight.departure_time,
              arrivalTime: newFlight.arrival_time,
              status: newFlight.status,
              airplaneModel: newFlight.aircraft_type, // Sending airplane model instead of ID
            }),
          });

          if (!response.ok) {
            throw new Error('Thêm chuyến bay thất bại.');
          }

          const addedFlight = await response.json();
          console.log(addedFlight);
          setFlights([...flights, addedFlight]);
          resetForm();
          toast.success('Thêm chuyến bay thành công!');
        } catch (error) {
          toast.error('Thêm chuyến bay thất bại.');
          console.error('Lỗi khi thêm chuyến bay:', error);
        }
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
      onCancel: () => setConfirmDialog({ ...confirmDialog, isOpen: false }),
    });
  };

  const handleDeleteFlight = async (id) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Xóa chuyến bay',
      message: 'Bạn có chắc chắn muốn xóa chuyến bay này không?',
      onConfirm: async () => {
        try {
          // console.log('id', id);
          const response = await fetch(
            `http://localhost:5000/api/admin/flight/${id}`,
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
              },
            }
          );

          if (!response.ok) {
            throw new Error('Xóa chuyến bay thất bại.');
          }

          const updatedFlights = flights.filter((flight) => flight.id !== id);
          setFlights(updatedFlights);
          toast.success('Xóa chuyến bay thành công!');
        } catch (error) {
          toast.error('Xóa chuyến bay thất bại.');
          console.error('Lỗi khi xóa chuyến bay:', error);
        }
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
      onCancel: () => setConfirmDialog({ ...confirmDialog, isOpen: false }),
    });
  };

  const handleEditFlight = (flight) => {
    setSelectedFlight({
      ...flight,
      aircraft_type: flight.Airplane ? flight.Airplane.model : '',
    });
    setIsEditOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedFlight || !selectedFlight.id) {
      console.error('ID chuyến bay không tồn tại');
      return;
    }
    setConfirmDialog({
      isOpen: true,
      title: 'Lưu lại các thay đổi',
      message: 'Bạn có chắc chắn muốn lưu lại các thay đổi cho chuyến bay này không?',
      onConfirm: async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/admin/flight/${selectedFlight.id}`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
              },
              body: JSON.stringify({
                flightNumber: selectedFlight.flight_number,
                origin: selectedFlight.origin,
                destination: selectedFlight.destination,
                departureTime: selectedFlight.departure_time,
                arrivalTime: selectedFlight.arrival_time,
                status: selectedFlight.status,
                airplaneModel: selectedFlight.aircraft_type, // Sending airplane model instead of ID
              }),
            }
          );

          if (!response.ok) {
            throw new Error('Cập nhật chuyến bay thất bại');
          }

          const updatedFlight = await response.json();
          console.log(updatedFlight);
          setFlights(
            flights.map((flight) =>
              flight.id === updatedFlight.id ? updatedFlight : flight
            )
          );
          toast.success('Cập nhật chuyến bay thành công!');
          setIsEditOpen(false);
        } catch (error) {
          toast.error('Cập nhật chuyến bay thất bại.');
          console.error('Lỗi khi lưu lại các thay đổi:', error);
        }
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
      onCancel: () => setConfirmDialog({ ...confirmDialog, isOpen: false }),
    });
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedFlights = [...flights].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const resetForm = () => {
    setNewFlight({
      flight_number: '',
      origin: '',
      destination: '',
      departure_time: '',
      arrival_time: '',
      duration: '',
      status: 'Scheduled',
      aircraft_type: '',
      seat_number: '',
    });
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <Card className="shadow-md">
        <CardHeader>
          <h1 className="text-center text-2xl font-bold">Quản lý chuyến bay</h1>
        </CardHeader>
        <CardContent>
          {/* Form thêm chuyến bay */}
          <div className="mb-6 space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Flight Number */}
              <Input
                value={newFlight.flight_number}
                onChange={(e) =>
                  setNewFlight({ ...newFlight, flight_number: e.target.value })
                }
                placeholder="Mã chuyến bay"
              />

              {/* Origin */}
              <Input
                value={newFlight.origin}
                onChange={(e) =>
                  setNewFlight({ ...newFlight, origin: e.target.value })
                }
                placeholder="Điểm khởi hành"
              />

              {/* Destination */}
              <Input
                value={newFlight.destination}
                onChange={(e) =>
                  setNewFlight({ ...newFlight, destination: e.target.value })
                }
                placeholder="Điểm đến"
              />

              {/* Departure Time */}
              <DateTimePicker
                dateTime={newFlight.departure_time}
                setDateTime={(date) =>
                  setNewFlight({ ...newFlight, departure_time: date })
                }
                title="Giờ khởi hành"
              />

              {/* Arrival Time */}
              <DateTimePicker
                dateTime={newFlight.arrival_time}
                setDateTime={(date) =>
                  setNewFlight({ ...newFlight, arrival_time: date })
                }
                title="Giờ đến"
              />

              {/* Duration */}
              <div className="flex items-center">
                <span className="text-gray-700">Thời lượng:</span>
                <span className="ml-2">
                  {newFlight.departure_time && newFlight.arrival_time
                    ? calculateDuration(
                        newFlight.departure_time,
                        newFlight.arrival_time
                      )
                    : '0h 0m'}
                </span>
              </div>
            </div>

            {/* Status and Aircraft Type */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Flight Status */}
              <select
                value={newFlight.status}
                onChange={(e) =>
                  setNewFlight({ ...newFlight, status: e.target.value })
                }
                className="w-full rounded-md border p-2"
              >
                <option value="Scheduled">Đã lên lịch</option>
                <option value="Delayed">Chậm chuyến</option>
                <option value="Cancelled">Đã hủy</option>
              </select>

              {/* Aircraft Type */}
              <select
                value={newFlight.aircraft_type}
                onChange={(e) => {
                  setNewFlight({ ...newFlight, aircraft_type: e.target.value });
                  console.log('aircraft_type:', e.target.value);
                }}
                className="w-full rounded-md border p-2"
              >
                <option value="">Chọn loại máy bay</option>
                {airplaneModels.map((airplane) => (
                  <option key={airplane.model} value={airplane.model}>
                    {airplane.model}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-right">
              <Button
                onClick={handleAddFlight}
                className={`text-white ${
                  !newFlight.arrival_time ||
                  !newFlight.departure_time ||
                  !newFlight.destination ||
                  !newFlight.flight_number ||
                  !newFlight.origin ||
                  !newFlight.aircraft_type
                    ? 'cursor-not-allowed bg-gray-400 opacity-50'
                    : 'bg-[#ff4d4d] hover:bg-[#c84c4c]'
                }`}
                disabled={
                  !newFlight.arrival_time ||
                  !newFlight.departure_time ||
                  !newFlight.destination ||
                  !newFlight.flight_number ||
                  !newFlight.origin ||
                  !newFlight.aircraft_type
                }
              >
                Thêm chuyến bay
              </Button>
            </div>
          </div>

          {/* Table hiển thị danh sách chuyến bay */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead
                    className="cursor-pointer whitespace-nowrap px-4 py-2 text-center"
                    onClick={() => handleSort('flight_number')}
                  >
                    Mã chuyến bay
                    {sortConfig.key === 'flight_number' &&
                      (sortConfig.direction === 'ascending' ? (
                        <ArrowUp className="ml-1 inline" size={16} />
                      ) : (
                        <ArrowDown className="ml-1 inline" size={16} />
                      ))}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer whitespace-nowrap px-4 py-2 text-center"
                    onClick={() => handleSort('origin')}
                  >
                    Điểm khởi hành
                    {sortConfig.key === 'origin' &&
                      (sortConfig.direction === 'ascending' ? (
                        <ArrowUp className="ml-1 inline" size={16} />
                      ) : (
                        <ArrowDown className="ml-1 inline" size={16} />
                      ))}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer whitespace-nowrap px-4 py-2 text-center"
                    onClick={() => handleSort('destination')}
                  >
                    Điểm đến
                    {sortConfig.key === 'destination' &&
                      (sortConfig.direction === 'ascending' ? (
                        <ArrowUp className="ml-1 inline" size={16} />
                      ) : (
                        <ArrowDown className="ml-1 inline" size={16} />
                      ))}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer whitespace-nowrap px-4 py-2 text-center"
                    onClick={() => handleSort('departure_time')}
                  >
                    Giờ khởi hành
                    {sortConfig.key === 'departure_time' &&
                      (sortConfig.direction === 'ascending' ? (
                        <ArrowUp className="ml-1 inline" size={16} />
                      ) : (
                        <ArrowDown className="ml-1 inline" size={16} />
                      ))}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer whitespace-nowrap px-4 py-2 text-center"
                    onClick={() => handleSort('arrival_time')}
                  >
                    Giờ đến
                    {sortConfig.key === 'arrival_time' &&
                      (sortConfig.direction === 'ascending' ? (
                        <ArrowUp className="ml-1 inline" size={16} />
                      ) : (
                        <ArrowDown className="ml-1 inline" size={16} />
                      ))}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer whitespace-nowrap px-4 py-2 text-center"
                    onClick={() => handleSort('status')}
                  >
                    Trạng thái
                    {sortConfig.key === 'status' &&
                      (sortConfig.direction === 'ascending' ? (
                        <ArrowUp className="ml-1 inline" size={16} />
                      ) : (
                        <ArrowDown className="ml-1 inline" size={16} />
                      ))}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer whitespace-nowrap px-4 py-2 text-center"
                    onClick={() => handleSort('aircraft_type')}
                  >
                    Máy bay
                    {sortConfig.key === 'aircraft_type' &&
                      (sortConfig.direction === 'ascending' ? (
                        <ArrowUp className="ml-1 inline" size={16} />
                      ) : (
                        <ArrowDown className="ml-1 inline" size={16} />
                      ))}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer whitespace-nowrap px-4 py-2 text-center"
                    onClick={() => handleSort('duration')}
                  >
                    Thời lượng
                    {sortConfig.key === 'duration' &&
                      (sortConfig.direction === 'ascending' ? (
                        <ArrowUp className="ml-1 inline" size={16} />
                      ) : (
                        <ArrowDown className="ml-1 inline" size={16} />
                      ))}
                  </TableHead>
                  <TableHead className="whitespace-nowrap px-4 py-2 text-center">
                    Hành động
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {sortedFlights.map((flight) => (
                  <TableRow key={flight.id}>
                    <TableCell>{flight.flight_number}</TableCell>
                    <TableCell>{flight.origin}</TableCell>
                    <TableCell>{flight.destination}</TableCell>
                    <TableCell className="min-w-[200px]">
                      {formatDateTime(flight.departure_time)}
                    </TableCell>
                    <TableCell className="min-w-[200px]">
                      {formatDateTime(flight.arrival_time)}
                    </TableCell>
                    <TableCell>{flight.status}</TableCell>
                    <TableCell>
                      {flight.Airplane ? flight.Airplane.model : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {calculateDuration(
                        flight.departure_time,
                        flight.arrival_time
                      )}
                    </TableCell>
                    <TableCell className="flex space-x-2">
                      <Button
                        onClick={() => handleEditFlight(flight)}
                        className="rounded-md bg-green-400 p-2 hover:bg-green-500"
                        size="icon"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteFlight(flight.id)}
                        className="rounded-md bg-red-400 p-2 hover:bg-red-500"
                        size="icon"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal chỉnh sửa chuyến bay */}
      {selectedFlight && (
        <ResponsiveDialog
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          title="Chỉnh sửa thông tin chuyến bay"
        >
          <div className="grid grid-cols-1 gap-4">
            <Input
              value={selectedFlight.flight_number}
              onChange={(e) =>
                setSelectedFlight({
                  ...selectedFlight,
                  flight_number: e.target.value,
                })
              }
              placeholder="Mã chuyến bay"
            />
            <Input
              value={selectedFlight.origin}
              onChange={(e) =>
                setSelectedFlight({
                  ...selectedFlight,
                  origin: e.target.value,
                })
              }
              placeholder="Điểm khởi hành"
            />
            <Input
              value={selectedFlight.destination}
              onChange={(e) =>
                setSelectedFlight({
                  ...selectedFlight,
                  destination: e.target.value,
                })
              }
              placeholder="Điểm đến"
            />
            <DateTimePicker
              dateTime={selectedFlight.departure_time}
              setDateTime={(date) =>
                setSelectedFlight({ ...selectedFlight, departure_time: date })
              }
              title="Giờ khởi hành"
            />
            <DateTimePicker
              dateTime={selectedFlight.arrival_time}
              setDateTime={(date) =>
                setSelectedFlight({ ...selectedFlight, arrival_time: date })
              }
              title="Giờ đến"
            />
            <div className="flex items-center text-center">
              <span className="text-gray-700"> Thời lượng: </span>
              <span className="ml-2">
                {selectedFlight.departure_time && selectedFlight.arrival_time
                  ? calculateDuration(
                      selectedFlight.departure_time,
                      selectedFlight.arrival_time
                    )
                  : '00'}
              </span>
            </div>
            <select
              value={selectedFlight.status}
              onChange={(e) =>
                setSelectedFlight({
                  ...selectedFlight,
                  status: e.target.value,
                })
              }
              className="w-full rounded-md border p-2"
            >
              <option value="Scheduled">Đã lên lịch</option>
              <option value="Delayed">Chậm chuyến</option>
              <option value="Cancelled">Đã hủy</option>
            </select>
            <select
              value={selectedFlight.aircraft_type}
              onChange={(e) =>
                setSelectedFlight({
                  ...selectedFlight,
                  aircraft_type: e.target.value,
                })
              }
              className="w-full rounded-md border p-2"
            >
              <option value="">Chọn loại máy bay</option>
              {airplaneModels.map((airplane) => (
                <option key={airplane.model} value={airplane.model}>
                  {airplane.model}
                </option>
              ))}
            </select>
            {/* <Input
              type="number"
              value={selectedFlight.seat_number}
              onChange={(e) =>
                setSelectedFlight({
                  ...selectedFlight,
                  seat_number: e.target.value,
                })
              }
              placeholder="Number of Seats"
            /> */}
          </div>
          <div className="mt-4 text-right">
            <Button onClick={handleSaveEdit} className="text-white bg-[#ff4d4d] hover:bg-[#c84c4c]">
              Lưu lại các thay đổi
            </Button>
          </div>
        </ResponsiveDialog>
      )}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onCancel={confirmDialog.onCancel}
      />
    </div>
  );
};

export default FlightManagement;
