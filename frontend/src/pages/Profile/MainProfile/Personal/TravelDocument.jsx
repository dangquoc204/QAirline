const TravelDocument = () => {
  return (
    <div className="md:border-b md:border-gray-300 md:pb-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-700">
          Tài liệu du lịch của bạn
        </h2>
        {/* <button className="flex items-center gap-1 text-secondary">
          <Pencil className="h-4 w-4 text-secondary" />
          Edit
        </button> */}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold text-gray-800">Chi tiết hộ chiếu</p>
          <p className="text-gray-600">Chưa có thông tin</p>
        </div>
        <div>
          <p className="font-semibold text-gray-800">Số hộ chiếu</p>
          <p className="text-gray-600">Chưa có thông tin</p>
        </div>
        <div>
          <p className="font-semibold text-gray-800">Ngày hết hạn</p>
          <p className="text-gray-600">Chưa có thông tin</p>
        </div>
        <div>
          <p className="font-semibold text-gray-800">Số CMND/CCCD</p>
          <p className="text-gray-600">Chưa có thông tin</p>
        </div>
        <div>
          <p className="font-semibold text-gray-800">Mã khiếu nại an ninh</p>
          <p className="text-gray-600">Chưa có thông tin</p>
        </div>
        <div>
          <p className="font-semibold text-gray-800">Số nhận dạng hành khách</p>
          <p className="text-gray-600">Chưa có thông tin</p>
        </div>
      </div>
    </div>
  );
};

export default TravelDocument;
