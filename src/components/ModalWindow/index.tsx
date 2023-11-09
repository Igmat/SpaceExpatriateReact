import React, {
  useState,
  createContext,
  useMemo,
  memo,
  FC,
} from "react";
import styles from "./ModalWindow.module.scss";
import {
  ModalVariousOptions,
} from "../../Rules/ModalManager";

const modalContext = createContext({
  show<T>(
    content: FC<ModalVariousOptions<T>>,
    setOption: (option: T) => void,
    params: T | readonly T[],
    persistant: boolean = false
  ) { },
  hide: () => { },
});

interface ModalComponentProps<T> {
  hide: () => void;
  showModal: boolean;
  content: FC<ModalVariousOptions<T>>;
  onSelect: (option: T) => void;
  params: T | readonly T[];
  persistant: boolean;
}
//-----------------------------------------------------------

function ModalComponent<T>(props: ModalComponentProps<T>) {

  const keydownHandler = ({ key }: KeyboardEvent) => {
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
          params={props.params as readonly T[]}
        />
      </div>
    </div>
  );
};

//-----------------------------------------------------------

export function useModalService() {
  return React.useContext(modalContext);
}

export function useModalWrapper(content: React.ReactNode) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<FC<ModalVariousOptions<unknown>>>(() => () => null);
  const [persistant, setPersistant] = useState(false);
  const [propsOption, setPropsOption] = useState<unknown | readonly unknown[] | undefined>(undefined);
  const [handleSelect, setHandleSelect] = useState<(arg: unknown) => void>(() => () => null)

  const modalService = useMemo(
    () => ({
      show<T>(
        content: FC<ModalVariousOptions<T>>,
        onSelect: (selected: T) => void,
        params: T | readonly T[],
        persistant: boolean = false
      ) {
        setShowModal(true);
        setModalContent(() => content as FC<ModalVariousOptions<unknown>>);
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
  );

  const Modal = () => {
    return (
      propsOption !== undefined ?
        (<ModalComponent
          content={modalContent}
          onSelect={handleSelect}
          params={propsOption}
          hide={modalService.hide}
          showModal={showModal}
          persistant={persistant}
        />) :
        null
    )
  };

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
