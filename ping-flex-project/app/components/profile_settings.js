import React from 'react';
import { connect } from 'react-redux';

import {
  StackNavigator,
} from 'react-navigation';

import {
  Text,
  View,
  StyleSheet,
  Button,
} from 'react-native';

class ProfileSettings extends React.Component {
  constructor(props) {
    super(props)
  }

  static navigationOptions() {
    return {
      title: 'Settings',
    };
  };


  render() {
    const name = this.props.currentUser.name;

    return(
      <View style={styles.container}>
        <Text>Settings for {name}</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

var mapStateToProps = (state) => {
  return {
    currentUser: state.session.current_user,
  };
}

export default connect(mapStateToProps, null)(ProfileSettings);
