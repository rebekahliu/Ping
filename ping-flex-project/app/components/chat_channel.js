import React, { Component, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat';
import {connect} from 'react-redux';

import KeyboardSpacer from 'react-native-keyboard-spacer';

import {fetchMessages} from '../actions/message_actions';
import MessageAPI from '../util/message_api_util';

class ChatChannel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      text: ""
    };

    this.updateMessages = this.updateMessages.bind(this);
    // this.messages = this.messages.bind(this);
  }

  static contextTypes = {
    cable: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.props.fetchMessages(this.props.chatroomId)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      messages: nextProps.messages
    })
  }

  componentDidMount () {
    this.setupSubscription();
  }

  updateMessages(data) {
    this.setState({
      messages: this.state.messages.concat([{
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt,
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        }
      }])
    })
  }

  setupSubscription() {
    this.subscription = this.context.cable.subscriptions.create(
      { channel: "ChatChannel", chatroom_id: this.props.chatroomId }, {
        received: function(data) {
          this.updateMessages(data);
        },
        updateMessages: this.updateMessages
      });
  }

  componentWillUnmount () {
      this.subscription &&
          this.context.cable.subscriptions.remove(this.subscription)
  }

  onSend(message) {
    this.props.createMessage(message.text, this.props.chatroomId, this.props.token)
  }

  compare(a, b) {
    let comparison = 0;
    let ida = a._id
    let idb = b._id

    if (ida > idb) {
      comparison = 1;
    } else if (idb > ida) {
      comparison = -1;
    }

    return comparison;
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <GiftedChat
          messages={this.state.messages.sort(this.compare).reverse()}
          onSend={(messages) => this.onSend(messages[0])}
          user={{_id: this.props.userId}}
          />
        {Platform.OS === 'android' ? <KeyboardSpacer /> : null}
      </View>
    );
  }
};

var mapStateToProps = (state) => {
  return {
    messages: state.messages,
    token: state.session.session_token,
    userId: state.session.current_user.id
  };
}

var mapDispatchToProps = (dispatch) => {
  return {
    fetchMessages: (chatroomId) => dispatch(fetchMessages(chatroomId)),
    createMessage: (content, chatroomId, token) => MessageAPI.createMessage(content, chatroomId, token)
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ChatChannel);
