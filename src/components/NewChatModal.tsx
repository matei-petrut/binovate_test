import React, { useState } from 'react';

import { Modal, Grid, TextField, Button } from '@mui/material';
import { NewChatModalState } from '../models';

interface NewChatModalProps {
  modalState: NewChatModalState;
}

export const NewChatModal: React.FC<NewChatModalProps> = ({ modalState }) => {
  const [textFiledValue, setTextFieldValue] = useState<string | undefined>();

  return (
    <Modal open={modalState.isOpen} onClose={modalState.onClose}>
        <Grid container sx={style}>
            <TextField
              value={textFiledValue}
              placeholder={modalState.placeholder}
              onChange={(e) => setTextFieldValue(e.target.value)}
            />
            <Button sx={{ flexGrow: 1 }} onClick={() => modalState.onSubmit && modalState.onSubmit(textFiledValue)}>
              Create
            </Button>
        </Grid>
    </Modal>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};