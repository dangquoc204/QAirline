import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useNavigate } from 'react-router-dom';

const DestinationCard = ({ city, image, dates, price, large = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/book');
  }

  return (
    <Card
      className={`group relative overflow-hidden ${large ? 'md:col-span-2 md:row-span-2' : ''}`}
    >
      {/* Image Section */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={city}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:opacity-50"></div>
      </div>

      {/* Content Section */}
      <div className="relative flex h-full flex-col justify-end p-4 text-white sm:p-6">
        <h3 className={`mb-1 font-bold ${large ? 'text-2xl' : 'text-xl'}`}>
          {city}
        </h3>
        <p className="mb-2 text-sm opacity-90">{dates}</p>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm opacity-90">Hạng phổ thông từ</p>
            <p className={`font-bold ${large ? 'text-xl' : 'text-lg'}`}>
              {price} USD
            </p>
          </div>

          {/* Buttons with hover effect */}
          <div className="translate-y-4 space-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Button
              variant="outline"
              onClick={handleClick}
              className={`w-full bg-white text-[#ff4d4d] hover:bg-white/20 hover:text-[#c84c4c] ${large ? 'py-2 text-sm' : 'py-1 text-xs'}`}
            >
              Đặt ngay
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export function FlightDeals() {
  const destinations = [
    {
      city: 'Athens',
      image:
        'https://i.pinimg.com/736x/6d/2d/60/6d2d60cea7de96a5d2aeaac86478d276.jpg',
      dates: '06 Tháng 3 2025 - 19 Tháng 3 2025',
      price: '977',
      large: true,
    },
    {
      city: 'Barcelona',
      image:
        'https://i.pinimg.com/736x/a8/c5/99/a8c5999494bd2891c1c6b73ddc5f5250.jpg',
      dates: '06 Tháng 3 2025 - 13 Tháng 3 2025',
      price: '922',
    },
    {
      city: 'Larnaca',
      image:
        'https://i.pinimg.com/736x/07/e4/4e/07e44ebe6285349e0f297a894d7f930d.jpg',
      dates: '22 Tháng 12 2024 - 30 Tháng 12 2024',
      price: '1478',
    },
    {
      city: 'Milan',
      image:
        'https://i.pinimg.com/736x/d4/3c/94/d43c94855e46b82281ab895923ad7493.jpg',
      dates: '11 Tháng 2 2025 - 13 Tháng 2 2025',
      price: '934',
    },
    {
      city: 'Nice',
      image:
        'https://i.pinimg.com/736x/6c/df/6b/6cdf6becd7bfb628df4602992fa5eb50.jpg',
      dates: '24 Tháng 3 2025 - 28 Tháng 3 2025',
      price: '938',
    },
    {
      city: 'Bucharest',
      image:
        'https://i.pinimg.com/736x/62/a3/f9/62a3f9965ddceb233ca0141d6c1aba1e.jpg',
      dates: '10 Tháng 3 2025 - 16 Tháng 3 2025',
      price: '1074',
    },
    {
      city: 'Prague',
      image:
        'https://i.pinimg.com/736x/c6/63/6d/c6636dbfb0d5c13a3d978b19db83bc2f.jpg',
      dates: '01 Tháng 4 2025 - 21 Tháng 4 2025',
      price: '805',
    },
    {
      city: 'Sofia',
      image:
        'https://i.pinimg.com/736x/d6/8c/03/d68c032f60b483ece7327591c71dcf3b.jpg',
      dates: '23 Tháng 3 2025 - 27 Tháng 3 2025',
      price: '812',
    },
    {
      city: 'Venice',
      image:
        'https://i.pinimg.com/736x/61/31/39/61313929e6bce1fe19c9ff5831b2734a.jpg',
      dates: '13 Tháng 3 2025 - 18 Tháng 3 2025',
      price: '960',
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="mb-8 text-3xl font-bold text-[#ff4d4d]">
        Điểm đến phổ biến
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {destinations.map((destination, index) => (
          <DestinationCard key={destination.city} {...destination} />
        ))}
      </div>
    </div>
  );
}
