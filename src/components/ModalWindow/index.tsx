import React, {
  useState,
  createContext,
  useMemo,
  memo,
  FC,
} from "react";
import styles from "./ModalWindow.module.scss";
import {
  ModalOptions,
} from "../../Rules/ModalManager";

/*type ModalServiceType<T> = {
  show: (
    content: FC<ModalOptions<T>>,
    setOption: (option: T) => void,
    onClose: () => void,
    params?: any,
    persistant?: boolean
  ) => void,
  hide: () => void,
}
*/

const modalContext = createContext({
  show<T>(
    content: FC<ModalOptions<T>>,
    setOption: (option: T) => void,
    onClose: () => void,
    params?: any,
    persistant: boolean = false
  ) { },
  hide: () => { },
});

interface ModalComponentProps<T> {
  hide: () => void;
  showModal: boolean;
  content: FC<ModalOptions<T>>;
  onSelect: (option: T) => void;
  params?: any;
  close: () => void;
  persistant: boolean;
}
//-----------------------------------------------------------

function ModalComponent<T>(props: ModalComponentProps<T>) {

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
          onSelect={props.onSelect}
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

export function useModalWrapper<T>(content: React.ReactNode) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<FC<ModalOptions<T>>>(() => () => null);
  const [persistant, setPersistant] = useState(false);
  const [propsOption, setPropsOption] = useState<T | undefined>(undefined);
  const [handleSelect, setHandleSelect] = useState<(arg:T)=>void>(()=>()=>null)

  const modalService: any = useMemo(
    () => ({
      show: (
        content: FC<ModalOptions<T>>,
        onSelect: (selected: T) => void,
        params?: any,
        persistant: boolean = false
      ) => {
        setShowModal(true);
        setModalContent(() => content);
        setHandleSelect(() => onSelect)
        setPropsOption(params)
        setPersistant(persistant);
      },
      hide: () => {
        setShowModal(false);
        setModalContent(() => () => null);
      },
    }),
    []
  ) as any;

  const Modal = () => {
    return (
    <ModalComponent
      content={modalContent}
      onSelect={handleSelect}
      params={propsOption}
      close={modalService.hide}
      hide={modalService.hide}
      showModal={showModal}
      persistant={persistant}
    />
  )};

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
    <Provider>
      <>
        {memorisedContent}
        <Modal />
      </>
    </Provider>
  );
}
