import { useState, useEffect } from 'react';
import { Pencil, Trash, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Toaster } from '../../components/ui/Sonner';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../components/ui/Dialog';
import ConfirmDialog from '../../components/ConfirmDialog';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/Table';

const AirplaneManagement = () => {
  const [airplanes, setAirplanes] = useState([]);
  const [newAirplane, setNewAirplane] = useState({
    model: '',
    manufacturer: '',
    seat_count: '',
  });
  const [selectedAirplane, setSelectedAirplane] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: 'model',
    direction: 'asc',
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    action: null,
    title: '',
    message: '',
    onConfirm: null,
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch airplane data from the server
    const fetchAirplanes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/airplanes/');
        const data = await response.json();
        console.log('Máy bay:', data);
        setAirplanes(data);
      } catch (error) {
        toast.error('Tải máy bay thất bại.');
        console.error('Lỗi khi tải máy bay:', error);
      }
    };

    fetchAirplanes();

  }, []);

  const handleAddAirplane = async () => {
    if (!newAirplane.model || !newAirplane.seat_count) {
      toast.error('Vui lòng điền vào tất cả các ô');
      return;
    }
    setConfirmDialog({
      isOpen: true,
      title: 'Thêm máy bay mới',
      message: 'Bạn có chắc chắn muốn thêm máy bay này không?',
      onConfirm: async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('http://localhost:5000/api/admin/airplane/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token ? `Bearer ${token}` : ''
            },
            body: JSON.stringify(newAirplane),
          });

          if (response.ok) {
            const addedAirplane = await response.json();
            console.log(addedAirplane);
            setAirplanes([...airplanes, addedAirplane.airplane]);
            setNewAirplane({ model: '', manufacturer: '', seat_count: '' });
            toast.success('Thêm máy bay thành công!');
          } else {
            console.error('Thêm máy bay thất bại');
          }
        } catch (error) {
          toast.error('Thêm máy bay thất bại');
          console.error('Lỗi khi thêm máy bay:', error);
        }
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
      onCancel: () => setConfirmDialog({ ...confirmDialog, isOpen: false }),
    });
  };

  const handleDeleteAirplane = async (id) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Xóa máy bay',
      message: 'Bạn có chắc chắn muốn xóa máy bay này không?',
      onConfirm: async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/admin/airplane/${id}`,
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
              },
            }
          );

          if (response.ok) {
            toast.success('Xóa máy bay thành công!');
            setAirplanes(airplanes.filter((plane) => plane.id !== id));
          } else {
            toast.error('Xóa máy bay thất bại.');
            console.error('Lỗi khi xóa máy bay');
          }
        } catch (error) {
          console.error('Lỗi khi xóa máy bay:', error);
        }
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
      onCancel: () => setConfirmDialog({ ...confirmDialog, isOpen: false }),
    });
  };

  const handleEditAirplane = (plane) => {
    setSelectedAirplane(plane);
    setIsEditOpen(true);
  };

  const handleSaveEdit = async () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Lưu lại các thay đổi',
      message: 'Bạn có chắc chắn muốn lưu lại các thay đổi cho máy bay này không?',
      onConfirm: async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/admin/airplane/${selectedAirplane.id}`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
              },
              body: JSON.stringify(selectedAirplane),
            }
          );

          if (response.ok) {
            const result = await response.json();
            setAirplanes(
              airplanes.map((plane) =>
                plane.id === result.airplane.id ? result.airplane : plane
              )
            );
            toast.success('Máy bay đã được cập nhật thành công!');
            setIsEditOpen(false);
          } else {
            console.error('Cập nhật máy bay thất bại.');
          }
        } catch (error) {
          toast.error('Cập nhật máy bay thất bại');
          console.error('Lỗi khi lưu lại các thay đổi:', error);
        }
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
      onCancel: () => setConfirmDialog({ ...confirmDialog, isOpen: false }),
    });
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedAirplanes = [...airplanes].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <Card className="shadow-md">
        <CardHeader>
          <h1 className="text-center text-2xl font-bold">
            Quản lý máy bay
          </h1>
        </CardHeader>
        <CardContent>
          {/* Form thêm máy bay */}
          <div className="mb-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Input
                value={newAirplane.model}
                onChange={(e) =>
                  setNewAirplane({ ...newAirplane, model: e.target.value })
                }
                placeholder="Loại máy bay"
                required
              />
              <Input
                value={newAirplane.manufacturer}
                onChange={(e) =>
                  setNewAirplane({
                    ...newAirplane,
                    manufacturer: e.target.value,
                  })
                }
                placeholder="Hãng sản xuất (không bắt buộc)"
              />
              <Input
                type="number"
                value={newAirplane.seat_count}
                onChange={(e) =>
                  setNewAirplane({ ...newAirplane, seat_count: e.target.value })
                }
                placeholder="Số ghế"
                required
              />
            </div>
            <div className="text-right">
              <Button
                onClick={handleAddAirplane}
                className={`text-white ${
                  !newAirplane.model || !newAirplane.seat_count
                    ? 'cursor-not-allowed bg-gray-400 opacity-50'
                    : 'bg-[#ff4d4d] hover:bg-[#c84c4c]'
                }`}
                disabled={!newAirplane.model || !newAirplane.seat_count}
              >
                Thêm máy bay
              </Button>
            </div>
          </div>

          {/* Table hiển thị danh sách máy bay */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead
                    className="w-1/4 cursor-pointer text-center"
                    onClick={() => handleSort('model')}
                  >
                    Loại
                    {sortConfig.key === 'model' &&
                      (sortConfig.direction === 'asc' ? (
                        <ArrowUp className="ml-1 inline" size={16} />
                      ) : (
                        <ArrowDown className="ml-1 inline" size={16} />
                      ))}
                  </TableHead>
                  <TableHead
                    className="w-1/4 cursor-pointer text-center"
                    onClick={() => handleSort('manufacturer')}
                  >
                    Hãng sản xuất
                    {sortConfig.key === 'manufacturer' &&
                      (sortConfig.direction === 'asc' ? (
                        <ArrowUp className="ml-1 inline" size={16} />
                      ) : (
                        <ArrowDown className="ml-1 inline" size={16} />
                      ))}
                  </TableHead>
                  <TableHead
                    className="w-1/4 cursor-pointer text-center"
                    onClick={() => handleSort('seat_count')}
                  >
                    Số ghế
                    {sortConfig.key === 'seat_count' &&
                      (sortConfig.direction === 'asc' ? (
                        <ArrowUp className="ml-1 inline" size={16} />
                      ) : (
                        <ArrowDown className="ml-1 inline" size={16} />
                      ))}
                  </TableHead>
                  <TableHead className="w-1/4 text-center">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedAirplanes.length > 0 ? (
                  sortedAirplanes.map((plane) => (
                    <TableRow
                      key={plane.id}
                      className="transition duration-300 hover:bg-gray-50"
                    >
                      <TableCell className="text-center">
                        {plane.model}
                      </TableCell>
                      <TableCell className="text-center">
                        {plane.manufacturer || 'N/A'}
                      </TableCell>
                      <TableCell className="text-center">
                        {plane.seat_count}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center space-x-2">
                          <Button
                            onClick={() => handleEditAirplane(plane)}
                            className="rounded-md bg-green-400 p-2 hover:bg-green-500"
                            size="icon"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteAirplane(plane.id)}
                            className="rounded-md bg-red-400 p-2 hover:bg-red-500"
                            size="icon"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan="4"
                      className="text-center italic text-gray-500"
                    >
                      Chưa có máy bay nào.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal chỉnh sửa máy bay */}
      {selectedAirplane && (
        <Dialog open={isEditOpen} onOpenChange={() => setIsEditOpen(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Chỉnh sửa thông tin máy bay</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-4">
              <Input
                value={selectedAirplane.model}
                onChange={(e) =>
                  setSelectedAirplane({
                    ...selectedAirplane,
                    model: e.target.value,
                  })
                }
                placeholder="Loại máy bay"
                required
              />
              <Input
                value={selectedAirplane.manufacturer}
                onChange={(e) =>
                  setSelectedAirplane({
                    ...selectedAirplane,
                    manufacturer: e.target.value,
                  })
                }
                placeholder="Hãng sản xuất (không bắt buộc)"
              />
              <Input
                type="number"
                value={selectedAirplane.seat_count}
                onChange={(e) =>
                  setSelectedAirplane({
                    ...selectedAirplane,
                    seat_count: e.target.value,
                  })
                }
                placeholder="Số ghế"
                required
              />
            </div>
            <DialogFooter>
              <Button onClick={handleSaveEdit} className="text-white bg-[#ff4d4d] hover:bg-[#c84c4c]">
                Lưu lại các thay đổi
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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

export default AirplaneManagement;
