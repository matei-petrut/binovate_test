import React from 'react';

import { Grid, Typography } from '@mui/material';

import { Message, MessageType } from '../models';

interface MessageCardProps {
    message: Message;
}

export const MessageBox: React.FC<MessageCardProps> = ({ message }) => {
  const date = new Date(message.timestamp);

  return (
    <Grid
      item
      xs={6}
      borderRadius={2}
      bgcolor={message.type === MessageType.SENT ? '#B1AFFF' : '#B8E8FC'}
      margin={1}
      padding={1}
      alignSelf={message.type === MessageType.SENT ? 'flex-end' : 'flex-start'}
    >
      <Typography variant='body1' textAlign='left'>{message.content}</Typography>
      <Typography variant='body2' textAlign='right'>{date.toLocaleString()}</Typography>
    </Grid>
  );
};
