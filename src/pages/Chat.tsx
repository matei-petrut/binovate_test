import { useEffect, useState } from 'react';

import { Guid } from 'guid-typescript';

import { Container, Grid, Typography, Avatar, Button } from '@mui/material';

import { ConversationCard, ChatTopBar, MessageBox, InputBox, NewChatModal } from '../components';

import { Message, MessageType, Conversation, User, ContentType, NewChatModalState } from '../models';
import { ConversationsService } from '../services';

const currentUser: User = {
  id: Guid.create().toString(),
  name: 'Petrut',
  profilePicture: 'https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fG1hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
};

export const Chat = () => {
  const conversationsService = new ConversationsService();

  const [createNewChatModalState, setCreateNewChatModalState] = useState<NewChatModalState>({ isOpen: false });
  const [userConversations, setUserConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | undefined>();

  useEffect(() => {
    const conversations = conversationsService.getAllConversations();
    const lastConversation = conversationsService.getLastOpenConversation();
    setUserConversations(conversations);
    setCurrentConversation(lastConversation);
  }, []);

  const handleCloseModal = () => setCreateNewChatModalState((prevState) => ({ ...prevState,  isOpen: false }));

  const createConversation = (userName?: string) => {
    if (!userName) {
      return;
    }

    const newUser: User = {
      id: Guid.create().toString(),
      name: userName
    };
    const newConversation: Conversation = {
      id: Guid.create().toString(),
      isGroup: false,
      participants: [newUser],
      messages: []
    };

    handleCloseModal();
    setUserConversations((prevUserConversations) => [ ...prevUserConversations, newConversation]);
    setCurrentConversation(newConversation);
    conversationsService.persistConversations([ ...userConversations, newConversation]);
    conversationsService.persistLastOpenConversation(newConversation);
  };

  const createGroupConversation = (groupName?: string) => {
    if (!groupName) {
      return;
    }

    const newConversation: Conversation = {
      id: Guid.create().toString(),
      isGroup: true,
      groupName: groupName,
      participants: [],
      messages: []
    };

    handleCloseModal();
    setUserConversations((prevUserConversations) => [ ...prevUserConversations, newConversation]);
    setCurrentConversation(newConversation);
    conversationsService.persistConversations([ ...userConversations, newConversation]);
    conversationsService.persistLastOpenConversation(newConversation);
  };

  const sendMessage = (content?: string) => {
    if (!content) {
      return;
    }

    const message: Message = {
      id: Guid.create().toString(),
      content: content,
      contentType: ContentType.TEXT,
      timestamp: Date.now(),
      sender: currentUser,
      type: MessageType.SENT,
    };
    currentConversation?.messages?.push(message);
    userConversations.find((conv) => conv.id === currentConversation?.id)?.messages.push(message);

    setCurrentConversation((prevConservation) => prevConservation != null ? { ...prevConservation } : undefined);
    setUserConversations([...userConversations]);
    currentConversation?.participants.map((participant) => sendBotMessage(participant));
    conversationsService.persistConversations(userConversations);
    conversationsService.persistLastOpenConversation(currentConversation);
  }

  const sendBotMessage = (user: User) => {
    const message: Message = {
      id: Guid.create().toString(),
      content: 'Random ❤️',
      contentType: ContentType.TEXT,
      timestamp: Date.now(),
      sender: user,
      type: MessageType.RECEIVED,
    };
    currentConversation?.messages?.push(message);
    userConversations.find((conv) => conv.id === currentConversation?.id)?.messages.push(message);

    setCurrentConversation((prevConservation) => prevConservation != null ? { ...prevConservation } : undefined);
    setUserConversations([...userConversations]);
  }

  return (
    <Container sx={{ backgroundColor: 'white', minHeight: '100vh', maxHeight: '100vh' }}>
      <Grid container>
        <Grid container item xs={3} direction='column' alignItems='center'>
          <Avatar
            alt="avatar"
            src={currentUser.profilePicture}
            sx={{ width: 150, height: 150, marginY: 1 }}
          />
          <Grid item>
            <Button onClick={() => setCreateNewChatModalState({ isOpen: true, onSubmit: createConversation, placeholder: 'Create new chat', onClose: handleCloseModal })}>
              New Chat
            </Button>
            <Button onClick={() => setCreateNewChatModalState({ isOpen: true, onSubmit: createGroupConversation, placeholder: 'Create new group', onClose: handleCloseModal })}>
              Create Group
            </Button>
          </Grid>
          <Typography>Conversations</Typography>
          <Grid item container sx={{ overflow: 'hidden', overflowY: 'scroll', maxHeight: '60vh' }}>
            {userConversations.map((conversation) => {
              return (
                <ConversationCard
                  key={conversation.id}
                  handleClick={() => setCurrentConversation(conversation)}
                  conversation={conversation}
                />
              );
            })}
          </Grid>
        </Grid>
        <Grid 
          item
          xs={9}
          textAlign='center'
          sx={{ minHeight: '100vh', maxHeight: '100vh', background: 'linear-gradient(181deg, #92DA45 0%, #fff 100%)' }}
        >
          {currentConversation ? (
            <>
              <ChatTopBar 
                name={currentConversation.isGroup ? currentConversation.groupName : currentConversation.participants[0].name} 
                isGroup={currentConversation.isGroup}
              />
              <Grid sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', overflowY: 'scroll', maxHeight: '75vh' }}>
              {currentConversation.messages.map((message) => {
                return (
                  <MessageBox 
                    key={message.id}
                    message={message}
                  />
                );
              })}
              </Grid>
              <Grid sx={{ position: 'absolute', bottom: 45, width: '40%' }}>
                <InputBox onSubmit={sendMessage} />
              </Grid>
            </>
          ) : undefined}
        </Grid>
      </Grid>
      <NewChatModal modalState={createNewChatModalState} />
    </Container>
  );
};
