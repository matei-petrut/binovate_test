import React from 'react';

import { Grid, Avatar, Typography } from '@mui/material';

interface ChatTopBarProps {
    imageSrc?: string;
    name: string;
    isGroup?: boolean;
}

export const ChatTopBar: React.FC<ChatTopBarProps> = ({ imageSrc, name, isGroup }) => {
  return (
    <Grid container>
      {isGroup ? (
        <Grid item xs={1}>
          Add member
        </Grid>
      ) : undefined}
      
      <Grid xs={isGroup ? 11 : 12} item container bgcolor='#C8FFD4' justifyContent='center' alignItems='center' columnGap={3} sx={{ maxHeight: '15vh' }}>
        <Avatar
          alt="avatar"
          src={imageSrc ?? "https://source.unsplash.com/random/50×50"}
          sx={{ width: 50, height: 50, marginY: 2 }}
        />
        <Typography variant='h4'>{name}</Typography>
      </Grid>
    </Grid>
  );
};