'use client';
import { createContext, useState } from 'react';

import { Modal, Box, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const ModalContext = createContext({
  show: (param: ModalContent) => {
    console.log(param);
  },
  hide: () => {},
});

interface ModalProviderProps {
  children: React.ReactNode;
}

interface Modal extends ModalContent {
  isOpen: boolean;
}

interface ModalContent {
  title?: string;
  description?: string;
  confirmButton?: string;
  cancelButton?: string;
  confirmCallback?: () => void;
  cancelCallback?: () => void;
  useConfirmButton?: boolean;
  useCancelButton?: boolean;
}
export default function ModalProvider({ children }: ModalProviderProps) {
  const [modal, setModal] = useState<Modal>({ isOpen: false });

  return (
    <ModalContext.Provider
      value={{
        show: (param: ModalContent) => {
          setModal({
            isOpen: true,
            title: param.title,
            description: param.description,
            confirmButton: param.confirmButton,
            cancelButton: param.cancelButton,
            confirmCallback: param.confirmCallback,
            cancelCallback: param.cancelCallback,
            useConfirmButton: param.useConfirmButton ?? true,
            useCancelButton: param.useCancelButton ?? true,
          });
        },
        hide: () => {
          setModal({ isOpen: false });
        },
      }}
    >
      {children}
      <Modal
        open={modal.isOpen}
        onClose={() => setModal({ isOpen: false })}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h3 id="parent-modal-title">[Title] {modal.title}</h3>
          <p id="parent-modal-description">{modal.description}</p>
          {modal.useConfirmButton ? (
            <Button
              className="mr-1"
              variant="contained"
              onClick={() => {
                modal.confirmCallback && modal.confirmCallback();
                setModal({ isOpen: false });
              }}
            >
              {modal.confirmButton ?? 'confirm'}
            </Button>
          ) : (
            <></>
          )}
          {modal.useCancelButton ? (
            <Button
              variant="contained"
              onClick={() => {
                modal.cancelCallback && modal.cancelCallback();
                setModal({ isOpen: false });
              }}
            >
              {modal.cancelButton ?? 'cancel'}
            </Button>
          ) : (
            <></>
          )}
        </Box>
      </Modal>
    </ModalContext.Provider>
  );
}
