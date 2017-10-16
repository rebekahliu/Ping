import React from 'react';
import { connect } from 'react-redux';

import {
  StackNavigator,
} from 'react-navigation';

import {
  Text,
  View,
  Image,
  Platform,
  StyleSheet,
  FlatList,
  Button,
} from 'react-native';


class Profile extends React.Component {
  constructor(props) {
    super(props)
  }


  static navigationOptions = ({ navigation }) => ({
      headerStyle: (Platform.OS === 'ios') ? {} : {paddingLeft: 10, paddingRight:10, marginTop: 20},
      title: 'Profile',
      headerRight: <Button title="Settings" onPress={()=>navigation.navigate('ProfileSettings')} />,
  });

  _suggestedFriends = () => {
    this.props.navigation.navigate('SuggestedFriends');
  }

  _addedMe = () => {
    this.props.navigation.navigate('AddedMe');
  }


  render() {
    const pro_pic_url = this.props.currentUser.pro_pic_url;
    const name = this.props.currentUser.name;

    return(
      <View style={styles.container}>
      <Image source={{uri: pro_pic_url}}
       style={styles.proPic} />
     <Text style={styles.name}>{name}</Text>
      <Button style={styles.button} onPress={this._suggestedFriends} title="Add Friends"/>
      <Button style={styles.button} onPress={this._addedMe} title="Pending Requests"/>
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
  proPic: {
    width: 100,
    height: 100,
    borderRadius: 100/2,
  },
  name: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 50,
  }
});

var mapStateToProps = (state) => {
  return {
    currentUser: state.session.current_user,
  };
}

export default connect(mapStateToProps, null)(Profile);
