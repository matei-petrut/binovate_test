import React from 'react'

import { Grid, Typography, Avatar } from '@mui/material';
import { Conversation } from '../models';

interface ConversationCardProps {
    conversation: Conversation;
    handleClick: () => void;
}

export const ConversationCard: React.FC<ConversationCardProps> = (props) => {
  return (
    <Grid 
      item
      container
      direction='row'
      justifyContent='space-around'
      alignItems='center'
      sx={{ borderRadius: 5 }}
      bgcolor='#C8FFD4'
      margin={1}
      onClick={props.handleClick}
    >
      <Avatar
        alt="avatar"
        src={!props.conversation.isGroup ? props.conversation.participants[0].profilePicture : "https://source.unsplash.com/random/50×50"}
        sx={{ width: 50, height: 50, marginY: 2 }}
      />
      <Typography>{props.conversation.isGroup ? props.conversation.groupName : props.conversation.participants[0].name}</Typography>
    </Grid>
  );
};
