import React, {
  useState,
  createContext,
  useMemo,
  memo,
  FC,
} from "react";
import styles from "./ModalWindow.module.scss";
import {
  DeliveryModalOption,
  MillitaryModalOptions,
  ModalOptions,
  ResourcesModalOption
} from "../../Rules/ModalManager";
import { CardType } from "../../Rules/card-types";


type ModalOptionsType = CardType | ResourcesModalOption | MillitaryModalOptions | DeliveryModalOption | undefined;

const modalContext = createContext({
  show: (
    content: FC<ModalOptions<ModalOptionsType>>,
    setOption: (option: ModalOptionsType) => void,
    onClose: () => void,
    params?: any,
    persistant: boolean = false
  ) => { },
  hide: () => { },
});

interface ModalComponentProps {
  hide: () => void;
  showModal: boolean;
  content: FC<ModalOptions<ModalOptionsType>>;
  setOption: (option: ModalOptionsType) => void;
  params?: any;
  close: () => void;
  persistant: boolean;
}
//-----------------------------------------------------------

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
        <props.content
          chooseOption={props.setOption}
          params={props.params}
          onClose={props.close}
        />
      </div>
    </div>
  );
};

//-----------------------------------------------------------

export function useModalService() {
  return React.useContext(modalContext);
}

export function useModalWrapper(content: FC<ModalOptions<ModalOptionsType>>) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<FC<ModalOptions<ModalOptionsType>>>(() => null);
  const [persistant, setPersistant] = useState(false);
  const [propsOption, setPropsOption] = useState<ModalOptionsType>(undefined);

  const modalService = useMemo(
    () => ({
      show: (
        content: FC<ModalOptions<ModalOptionsType>>,
        setOption: (option: ModalOptionsType) => void,
        onClose: () => void,
        params?: any, 
        persistant: boolean = false
      ) => {
        setShowModal(true);
        setPersistant(persistant);
        setModalContent(content);
        setPropsOption(params)
      },
      hide: () => {
        setShowModal(false);
        setModalContent(() => null);
      },
    }),
    []
  );

  const Modal = () => (
    <ModalComponent
      content={modalContent}
      close={modalService.hide}
      setOption={(option: ModalOptionsType) => setPropsOption(option)}
      params={propsOption}
      hide={modalService.hide}
      showModal={showModal}
      persistant={persistant}
    />
  );

  const Provider = useMemo(
    () =>
      memo((props: { children?: JSX.Element }) => (
        <modalContext.Provider value={modalService}>
          {props.children}
        </modalContext.Provider>
      )),
    [modalService]
  );

  const memorisedContent = useMemo(
    () => content,
    [content]);
  return (
    <>
      <Provider>
        <>
          {memorisedContent}
          <Modal />
        </>
      </Provider>
    </>
  );
}
