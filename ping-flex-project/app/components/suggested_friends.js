import React from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet } from 'react-native';

class SuggestedFriends extends React.Component {

  render() {
    return (
      <Text>Suggested Friends Screen!</Text>
    );
  }
}

const mapStateToProps = (state) => {
  
};

const mapDispatchToProps = (dispatch) => {

};

export default connect(mapStateToProps, mapDispatchToProps)(SuggestedFriends);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
