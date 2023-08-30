import React, {
  ReactNode,
  useState,
  createContext,
  useMemo,
  memo,
} from "react";
import styles from "./ModalWindow.module.scss";

const modalContext = createContext({
  show: (content: React.ReactNode) => {},
  hide: () => {},
});

interface ModalComponentProps {
  hide: () => void;
  showModal: boolean;
  content: React.ReactNode;
}
const ModalComponent = (props: ModalComponentProps) => {
  const keydownHandler = ({ key }: any) => {
    switch (key) {
      case "Escape":
        props.hide();
        break;
      default:
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  });

  const closeModal = () => {
    props.hide();
  };

  return !props.showModal ? null : (
    <div className={styles.modal}>
      <div className={styles.modalDialog} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton}  onClick={closeModal}>X</button>
      {props.content}
      </div>
    </div>
  );
};

export function useModalService() {
  return React.useContext(modalContext);
}

export function useModalWrapper(content: React.ReactNode) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  const modalService = useMemo(
    () => ({
      show: (content: React.ReactNode) => {
        setShowModal(true);
        setModalContent(content);
      },
      hide: () => {
        setShowModal(false);
        setModalContent(null);
      },
    }),
    []
  );

  const Component = () => (
    <ModalComponent
      content={modalContent}
      hide={modalService.hide}
      showModal={showModal}
    />
  );

  const Provider = useMemo(
    () =>
      memo((props: { children?: ReactNode }) => (
        <modalContext.Provider value={modalService}>
          {props.children}
        </modalContext.Provider>
      )),
    [modalService]
  );

  const memorisedContent = useMemo(() => content, []);
  return (
    <>
      <Provider>{memorisedContent}</Provider>
      <Component />
    </>
  );
}
