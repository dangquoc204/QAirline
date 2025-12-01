function Booking() {
  return (
    <div className="rounded-b-none font-sans">
      {/* Nội dung phần "Đặt vé ngay" */}
      <div
        className="relative flex flex-col items-start justify-center overflow-hidden rounded-b-none bg-gray-100 px-6 py-12 font-sans shadow-lg md:flex-row"
        style={{ minHeight: '425px' }} // Tăng chiều cao phần Booking
      >
        {/* Hình ảnh */}
        <div className="absolute inset-0">
          <img
            src="https://genk.mediacdn.vn/thumb_w/640/139269124445442048/2022/5/24/take-photo-out-an-airplane-window-800x534-1653368460753-1653368460868632169694.jpg"
            alt="Qatar Airways"
            className="h-full w-full rounded-b-none object-cover"
          />
        </div>

        {/* Lớp phủ tối */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Phần thông tin */}
        <div className="pt-15 relative z-10 ml-2 w-full text-left text-white sm:ml-4 md:ml-10 md:pt-20">
          <h1 className="mb-4 text-2xl font-bold md:mb-6 md:text-4xl">
            Chào mừng đến với QAirline! 
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-[#cccccc] mt-5">  
            Cảm ơn bạn vì đã lựa chọn chúng tôi!
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Booking;