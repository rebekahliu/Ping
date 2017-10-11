import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {connect} from 'react-redux';

class MessageTest extends React.createClass {
  componentWillMount() {
    window.App.cable.subscriptions.create({
      channel: 'messages'
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

var mapStateToProps = (state) => {
  return {
    chats: state.chats
  };
};

module.exports = connect(mapStateToProps, null)(MessageTest);
