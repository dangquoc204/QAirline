import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/Tab';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../../components/ui/Accordion';
import { FaPlane, FaUserCheck } from 'react-icons/fa';
import BookFlight from '../FlightTab/BookFlight';
import ManageBooking from '../FlightTab/ManageBooking';
import { useEffect, useState } from 'react';

function FlightTab() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Check on initial render
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="mx-auto mt-10 max-w-6xl rounded-lg bg-gray-50 shadow-lg">
      {/* Tabs Header */}
      {!isMobile && (
        <Tabs defaultValue="book" className="w-full">
          <TabsList className="flex justify-between rounded-lg">
            <TabsTrigger
              value="book"
              className="flex w-full items-center justify-center gap-2 rounded-lg px-6 py-4 text-gray-700 transition duration-200 ease-in-out hover:bg-[#ff4d4d] hover:text-white focus:outline-none"
            >
              <FaPlane className="text-xl" /> Đặt vé
            </TabsTrigger>
            <TabsTrigger
              value="manage"
              className="flex w-full items-center justify-center gap-2 rounded-lg px-6 py-4 text-gray-700 transition duration-200 ease-in-out hover:bg-[#ff4d4d] hover:text-white focus:outline-none"
            >
              <FaUserCheck className="text-xl" /> Quản lý đặt vé
            </TabsTrigger>
          </TabsList>

          {/* Tab Content cho màn hình lớn */}
          <TabsContent value="book">
            <BookFlight />
          </TabsContent>
          <TabsContent value="manage">
            <ManageBooking />
          </TabsContent>
        </Tabs>
      )}

      {/* Accordion Menu cho màn hình nhỏ */}
      {isMobile && (
        <div className="block md:hidden">
          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="book">
              <AccordionTrigger className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-3 text-gray-700">
                <FaPlane className="text-xl" /> Đặt vé
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3">
                <BookFlight />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="manage">
              <AccordionTrigger className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-3 text-gray-700">
                <FaUserCheck className="text-xl" /> Quản lý đặt vé
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3">
                <ManageBooking />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  );
}

export default FlightTab;
