import { Dialog } from "@headlessui/react";
import SvgCloseIcon from "../svg-components/SvgCloseIcon";

interface ModalProps {
  isOpen: boolean;
  closeFn: () => void;
  content: JSX.Element;
}

const Modal = ({ isOpen, closeFn, content }: ModalProps) => {
  return (
    <Dialog className="" open={isOpen} onClose={() => {}}>
      <div
        className="backdrop-blur-[3px] fixed inset-0 bg-black/70 z-10 flex "
        aria-hidden="true"
      />
      <div className="fixed inset-0 items-start justify-center items-top flex overflow-auto py-7 w-screen h-screen z-20" data-testid="ModalScrollableContainer">
        <Dialog.Panel className="w-[90vw] sm:w-[85vw] max-w-[540px] bg-grey-bg-1 z-20 relative rounded-lg p-4 sm:p-6">
          <button
            onClick={closeFn}
            type="button"
            className="absolute right-4 top-4 w-10 h-10 p-2 z-50 active:scale-75 rounded-full app-outline"
          >
            <SvgCloseIcon color="#999999" />
          </button>
          {content}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Modal;
