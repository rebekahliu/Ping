import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

class ChatChannel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      text: ""
    };

    this.updateMessages = this.updateMessages.bind(this);
    this.messages = this.messages.bind(this);
  }

  static contextTypes = {
    cable: PropTypes.object.isRequired
  };

  updateMessages(data) {
    this.setState({
      messages: this.state.messages.concat([{
        content: data.content,
        username: data.user
      }])
    })
  }

  componentDidMount () {
    this.setupSubscription();
  }

  setupSubscription() {
    this.subscription = this.context.cable.subscriptions.create(
      { channel: "ChatChannel", chatroom_id: 1 }, {
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
      <Text key={`${idx}`}>{message.username}: {message.content}</Text>
    ))
  }

  handleSubmit(e) {
    e.preventDefault();
    // console.log(e.nativeEvent.text);

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

module.exports = ChatChannel;
