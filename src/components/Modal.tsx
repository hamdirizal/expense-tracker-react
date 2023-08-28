import { Dialog } from "@headlessui/react";

interface ModalProps {
  isOpen: boolean;
  closeFn: () => void;
  content: JSX.Element;
}

const Modal = ({ isOpen, closeFn, content }: ModalProps) => {
  return (
    <Dialog
      className="border-2 border-red-500 fixed inset-0 items-start justify-center flex"
      open={isOpen}
      onClose={() => closeFn()}
    >
      <div
        className="fixed inset-0 bg-black/70 z-10 flex "
        aria-hidden="true"
      />
      <Dialog.Panel className="w-[90vw] border-2 border-green-500 bg-white z-20 relative">
        {content}
      </Dialog.Panel>
    </Dialog>
  );
};

export default Modal;
