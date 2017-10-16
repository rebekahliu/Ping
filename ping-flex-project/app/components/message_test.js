import React from 'react';
import ActionCable from 'react-native-actioncable';
import ActionCableProvider from 'react-actioncable-provider';

import ChatChannel from './chat_channel';

const cable = ActionCable.createConsumer('wss://gentle-anchorage-13426.herokuapp.com/cable');

// export default function Container (props) {
//
//
//
//   return (
//       <ActionCableProvider cable={cable}>
//         <ChatChannel chatroomId={props.navigation.state.params.chatroomId} />
//       </ActionCableProvider>
//   );
// }

export default class Container extends React.Component {
  constructor(props) {
    super(props)
  }

  static navigationOptions({navigation}) {
    return {
      title: `${navigation.state.params.friendName}`,
      headerBackTitle: null,
    };
  };

  render() {
    return (
        <ActionCableProvider cable={cable}>
          <ChatChannel chatroomId={this.props.navigation.state.params.chatroomId} />
        </ActionCableProvider>
    );
  };

}
