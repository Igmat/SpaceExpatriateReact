import React, {
  ReactNode,
  useState,
  createContext,
  useMemo,
  memo,
} from "react";
import styles from "./ModalWindow.module.scss";

const modalContext = createContext({
  show: (content: React.ReactNode, persistant?: boolean) => {},
  hide: () => {},
});

interface ModalComponentProps {
  hide: () => void;
  showModal: boolean;
  content: React.ReactNode;
  persistant: boolean;
}
const ModalComponent = (props: ModalComponentProps) => {
  const keydownHandler = ({ key }: any) => {
    switch (key) {
      case "Escape":
        if (!props.persistant) props.hide();
        break;
      default:
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  });

  const closeModal = () => {
    if (!props.persistant) props.hide();
  };

  return !props.showModal ? null : (
    <div className={styles.modal}>
      <div className={styles.modalDialog} onClick={(e) => e.stopPropagation()}>
        {!props.persistant && (
          <button className={styles.closeButton} onClick={closeModal}>
            X
          </button>
        )}
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
  const [persistant, setPersistant] = useState(false);

  const modalService = useMemo(
    () => ({
      show: (content: React.ReactNode, persistant: boolean = false) => {
        setShowModal(true);
        setPersistant(persistant);
        setModalContent(content);
      },
      hide: () => {
        setShowModal(false);
        setModalContent(null);
      },
    }),
    []
  );

  const Modal = () => (
    <ModalComponent
      content={modalContent}
      hide={modalService.hide}
      showModal={showModal}
      persistant={persistant}
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

  const memorisedContent = useMemo(() => content, [content]);
  return (
    <>
      <Provider>
        {memorisedContent}
        <Modal />
      </Provider>
    </>
  );
}
