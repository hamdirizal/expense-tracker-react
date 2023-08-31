import { Dialog } from "@headlessui/react";
import SvgCloseIcon from "../svg-components/SvgCloseIcon";

interface ModalProps {
  isOpen: boolean;
  closeFn: () => void;
  content: JSX.Element;
}

const Modal = ({ isOpen, closeFn, content }: ModalProps) => {
  return (
    <Dialog
      className="border-2 border-red-500 fixed inset-0 items-start justify-center items-center flex"
      open={isOpen}
      onClose={() => closeFn()}
    >
      <div
        className=" backdrop-blur-[3px] fixed inset-0 bg-black/70 z-10 flex "
        aria-hidden="true"
      />
      <Dialog.Panel className="w-[85vw] max-w-[540px] bg-grey-bg-1 z-20 relative rounded-lg p-6">
        <button onClick={closeFn} type="button" className="absolute right-4 top-4 w-7 h-7 z-50 active:scale-75 rounded-full app-outline">
          <SvgCloseIcon color="#999999" />
        </button>
        {content}
      </Dialog.Panel>
    </Dialog>
  );
};

export default Modal;
