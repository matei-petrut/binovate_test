import React, { useState, useRef } from 'react';

import { IconButton, TextField, Grid } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

interface InputBoxProps {
  onSubmit: (content?: string) => void;
  handleUploadClick?: (event: any) => void;
}

export const InputBox: React.FC<InputBoxProps> = (props) => {
  const [value, setValue] = useState<string | undefined>();

  const handleSubmit = () => {
    props.onSubmit(value);
    setValue('');
  };

  return (
    <Grid 
      container
      xs={12}
      sx={{ maxHeight: '5vh' }}
      alignItems='center'
      marginX={1}
    >
      <Grid item xs={11}>
        <TextField fullWidth sx={{ maxHeight: '5vh' }} value={value} onChange={(e) => setValue(e.target.value)} />
      </Grid>
      <Grid item xs={1} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
        <IconButton color="primary" onClick={handleSubmit} component="label">
          <SendIcon />
        </IconButton>
        <IconButton onChange={props.handleUploadClick} color="primary" aria-label="upload picture" component="label">
          <input hidden accept="image/*" type="file" />
          <PhotoCamera />
        </IconButton>
      </Grid>
    </Grid>
  );
};