import { Dialog } from "@headlessui/react";
import SvgCloseIcon from "../svg-components/SvgCloseIcon";

interface ModalProps {
  isOpen: boolean;
  closeFn: () => void;
  content: JSX.Element;
}

const Modal = ({ isOpen, closeFn, content }: ModalProps) => {
  return (
    <Dialog className="Modal" open={isOpen} onClose={() => {}}>
      <div
        className="Modal__backdrop"
        aria-hidden="true"
      />
      <div className="Modal__scrollable">
        <Dialog.Panel className="Modal__dialog">
          <button
            onClick={closeFn}
            type="button"
            className="Modal__close"
          >
            <SvgCloseIcon color="#cccccc" />
          </button>
          {content}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Modal;
