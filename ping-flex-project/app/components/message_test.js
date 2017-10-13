import React from 'react';
import ActionCable from 'react-native-actioncable';
import ActionCableProvider from 'react-actioncable-provider';

import ChatChannel from './chat_channel';

const cable = ActionCable.createConsumer('https://1dd8c576.ngrok.io/cable');

export default function Container (props) {
    return (
        <ActionCableProvider cable={cable}>
            <ChatChannel />
        </ActionCableProvider>
    );
}
