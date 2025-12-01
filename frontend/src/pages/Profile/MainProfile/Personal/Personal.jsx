import React, { useState, useRef, useEffect } from 'react';
import DetailUser from './DetailUser';
import TravelDocument from './TravelDocument';
import { Avatar, AvatarImage, AvatarFallback } from '../../../../components/ui/Avatar';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/Card';
import { Pencil, X, Save } from 'lucide-react';
import { Input } from '../../../../components/ui/Input';
import DatePicker from '../../../../components/DatePicker';

const Personal = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState(null);
  const [avatar, setAvatar] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/customer/my-info',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setTitle(data.customer.title);
        setFirstName(data.customer.first_name);
        setMiddleName(data.customer.middle_name);
        setLastName(data.customer.last_name);
        setDob(
          data.customer.date_of_birth
            ? new Date(data.customer.date_of_birth)
            : null
        );
        setAvatar(data.customer.User.profilePicture);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        saveAvatarToServer(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveAvatarToServer = async (avatarData) => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/customer/update-profile',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ profilePicture: avatarData }),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update avatar');
      }
      const data = await response.json();
      setAvatar(data.profilePicture);
      console.log('Avatar updated successfully');
    } catch (error) {
      console.error('Error updating avatar:', error);
    }
  };

  const handleSaveProfile = async () => {
    const profileData = {
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      date_of_birth: (dob instanceof Date)
      ? dob.toISOString()
      : new Date(dob).toISOString(),
    };

    try {
      const response = await fetch(
        'http://localhost:5000/api/customer/update-profile',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(profileData),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      const data = await response.json();
      console.log('Profile updated successfully', data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const fullName = `${firstName || ''} ${middleName || ''} ${lastName || ''}`;
  const shortName = `${(firstName || '').charAt(0)}${(lastName || '').charAt(0)}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-[#ff4d4d] text-center mb-4">
          Thêm thông tin về bạn
        </CardTitle>
        <p>
          Vui lòng điền thông tin để hoàn thiện hồ sơ. Để có trải nghiệm du lịch suôn sẻ, hãy đảm bảo số hộ chiếu và ngày hết hạn hợp lệ.
        </p>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center gap-4 border-b border-gray-300 pb-6 md:gap-6">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatar} />
              <AvatarFallback>{shortName}</AvatarFallback>
            </Avatar>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              className="absolute bottom-0 right-0 rounded-full bg-white p-1 shadow"
              onClick={handleAvatarClick}
            >
              <Pencil className="h-4 w-4 text-[#ff4d4d]" />
            </button>
          </div>

          {/* Thông tin chi tiết */}
          <div>
            {isEditing ? (
              <>
                <Input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mb-2 w-[300px]"
                  placeholder="Nhập họ"
                />
                <Input
                  type="text"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  className="mb-2 w-[300px]"
                  placeholder="Nhập tên đệm"
                />
                <Input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mb-2 w-[300px]"
                  placeholder="Nhập tên"
                />
                <DatePicker
                  date={dob}
                  setDate={(date) => setDob(date)}
                />
              </>
            ) : (
              <>
                <h1 className="text-xl font-semibold text-gray-800">
                  Họ và tên: {fullName}
                </h1>
                <p className="text-gray-600">Ngày sinh: {dob ? new Date(dob).toLocaleDateString('vi-VN') : ''}</p>
              </>
            )}
          </div>
          <div className="ml-auto flex flex-col items-center gap-1">
            <button
              onClick={handleEditClick}
              className={`flex items-center gap-1 ${isEditing ? 'text-[#ff4d4d]' : 'text-[#0a0a0a]'}`}
            >
              {isEditing ? (
                <X className="h-4 w-4 text-[#ff4d4d]" />
              ) : (
                <Pencil className="h-4 w-4 text-[#0a0a0a]" />
              )}
              {isEditing ? 'Thoát' : 'Chỉnh sửa'}
            </button>
            {isEditing && (
              <button
                onClick={handleSaveProfile}
                className="mt-4 flex items-center gap-1"
              >
                <Save className="h-4 w-4" />
                Lưu
              </button>
            )}
          </div>
        </div>

        {/* Liên hệ */}
        <DetailUser />

        {/* Tài liệu du lịch */}
        <TravelDocument />
        {/*  */}
        <div className="mt-6 flex flex-col gap-4 pb-6 md:gap-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Cài đặt tài khoản
          </h2>
          <p>
            <strong>Xóa tài khoản:</strong> Các lần đặt chỗ liên kết với tài khoản này vẫn giữ hiệu lực, ngay cả khi bạn xóa tài khoản.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Personal;
