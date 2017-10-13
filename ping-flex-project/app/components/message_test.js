import React from 'react';
import ActionCable from 'react-native-actioncable';
import ActionCableProvider from 'react-actioncable-provider';

import ChatChannel from './chat_channel';

const cable = ActionCable.createConsumer('https://7c6a6c85.ngrok.io/cable');

export default function Container (props) {
    return (
        <ActionCableProvider cable={cable}>
          <ChatChannel chatroomId={props.navigation.state.params.chatroomId}/>
        </ActionCableProvider>
    );
}
