import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import {connect} from 'react-redux';

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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.messages = this.messages.bind(this);
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
        content: data.content,
        user: data.user
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

  messages() {
    return this.state.messages.map((message, idx) => (
      <Text key={`${idx}`}>{message.user}: {message.content}</Text>
    ))
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createMessage(e.nativeEvent.text, this.props.chatroomId, this.props.token)
    this.setState({text: ""})
  }

  render() {
    return (
      <View style={styles.container}>
        {this.messages()}
        <TextInput
        style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
        onSubmitEditing={this.handleSubmit}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

var mapStateToProps = (state) => {
  return {
    messages: state.messages,
    token: state.session.session_token
  };
}

var mapDispatchToProps = (dispatch) => {
  return {
    fetchMessages: (chatroomId) => dispatch(fetchMessages(chatroomId)),
    createMessage: (content, chatroomId, token) => MessageAPI.createMessage(content, chatroomId, token)
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ChatChannel);
