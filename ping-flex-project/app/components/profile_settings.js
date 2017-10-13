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
  Slider,
  Switch,
} from 'react-native';

import API from '../../api';
import * as SessionActions from '../actions/session_actions';


class ProfileSettings extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      visibleRadius: this.props.currentUser.visible_radius,
      findable: this.props.currentUser.findable,
    };

  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Settings',
      headerBackTitle: null,
      headerRight: <Button title="Done" onPress={() => {navigation.state.params.handleSave(navigation)}} />,
  };};


  saveDetails = async (navigation) => {
    //save the details based on state, then go back
    let settings = {
      findable: this.state.findable, visible_radius: this.state.visibleRadius
    };

    let response = await this.props.updateSettings(this.props.session.session_token, settings)

    navigation.goBack();
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleSave: this.saveDetails });
  }



  render() {
    const name = this.props.currentUser.name;

    return(
      <View style={styles.container}>
        <Text>Settings for {name}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={this.state.visibleRadius}
          onValueChange={(value) => this.setState({visibleRadius: value})}

          />
          <Text>
            visible Radius {this.state.visibleRadius}mi.
          </Text>
          <Switch
            style={styles.switch}
            value={this.state.findable}
            onValueChange={(value) => this.setState({findable: value})}
            />
          <Text>Show me on Ping </Text>
          <Text>While turned off, your friends will not be able to get your location. Must be turned on to send pings</Text>
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
  slider: {
    height: 10,
    width: 200,
    margin: 10,
  }
});

var mapStateToProps = (state) => {
  return {
    session: state.session,
    currentUser: state.session.current_user,
  };
}

var mapDispatchToProps = (dispatch) => {
  return {
    updateSettings: (token, settings) => dispatch(SessionActions.updateUser(token, settings))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);
