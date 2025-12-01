import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from '../components/ui/Dialog';
import { Button } from '../components/ui/Button';

const ConfirmDialog = ({ isOpen, onConfirm, onCancel, title, message }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="w-full max-w-md rounded-lg p-4 sm:max-w-lg sm:p-6 md:max-w-xl md:p-8 lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold md:text-xl">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 text-sm md:text-base">
          <p>{message}</p>
        </div>
        <DialogFooter className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button
            onClick={onCancel}
            className="w-full bg-gray-500 text-white hover:bg-gray-600 sm:w-auto"
          >
            Hủy
          </Button>
          <Button onClick={onConfirm} className="w-full text-white sm:w-auto bg-[#ff4d4d] hover:bg-[#c84c4c]">
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
