import { useEffect, useState, useCallback } from 'react';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/Card';
import { cn } from '../../services/utils';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';

function formatDate(string) {
  const d = new Date(string);
  const day   = String(d.getUTCDate()).padStart(2, '0');
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const year  = d.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

const PlanningCard = ({ image, title, cta, content, start_date, end_date }) => {
  let startDate = formatDate(start_date);
  let endDate = formatDate(end_date);

  return (
    <Card className="mx-2 flex-none flex flex-col transition-shadow duration-300 hover:shadow-lg w-full sm:w-1/2 md:w-1/4">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="h-56 w-full rounded-t-lg object-cover"
        />
      </div>
      <CardContent className="flex flex-1 flex-col p-4">
        <CardHeader className="flex-1 p-0">
          <CardTitle className="text-lg font-semibold text-gray-800">
            {title}
          </CardTitle>
          <div className="text-md text-gray-400">
            {content}
          </div>
        </CardHeader>
      </CardContent>
      <div className="text-sm ml-4 mb-2">
        Từ {startDate} đến {endDate}
      </div>
      <CardFooter className="p-0">
        <Button
          variant="ghost"
          className={cn(
            'flex w-full items-center justify-between border-t bg-gray-50 px-4 py-3 hover:bg-gray-100'
          )}
          onClick={() => alert(`Đã nhấn vào ${title}`)}
        >
          <span className="text-sm font-medium">{cta}</span>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const StartPlanning = () => {
  const [cards, setCards] = useState([]);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
      skipSnaps: false,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/post/');
        const data = await response.json();
        const posts = Array.isArray(data.posts) ? data.posts : [];
        setCards(posts);
      } catch (error) {
        console.error('Tải bài đăng thất bại:', error);
      }
    };

    fetchPosts();
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="bg-transparent px-6 py-12 md:px-28">
      <h2 className="mb-3 text-center text-3xl font-bold text-[#ff4d4d]">
        Bắt đầu lên kế hoạch cho chuyến đi
      </h2>
      <div className="relative mt-12 overflow-visible">
        <div className="overflow-hidden mx-4" ref={emblaRef}>
          <div className="flex">
            {(cards || []).map((card, index) => (
              <PlanningCard key={index} {...card} />
            ))}
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-x-6 -translate-y-1/2 transform rounded-full hover:text-[#ff4d4d] z-20"
          onClick={scrollPrev}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 transform rounded-full hover:text-[#ff4d4d] z-20"
          onClick={scrollNext}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
};

export default StartPlanning;
