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
  Picker,
  Image,
} from 'react-native';

import API from '../../api';
import * as SessionActions from '../actions/session_actions';

import {icons} from '../../assets/icons';


class ProfileSettings extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      visibleRadius: this.props.currentUser.visible_radius,
      findable: this.props.currentUser.findable,
      customPing1: this.props.currentUser.custom_ping_icons[0],
      customPing2: this.props.currentUser.custom_ping_icons[1],
      customPing3: this.props.currentUser.custom_ping_icons[2],
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
      findable: this.state.findable, visible_radius: this.state.visibleRadius, custom_ping_icons: [this.state.customPing1, this.state.customPing2, this.state.customPing3],
    };

    let response = await this.props.updateSettings(this.props.session.session_token, settings)

    navigation.goBack();
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleSave: this.saveDetails });
  }



  render() {
    const name = this.props.currentUser.name;
    const customIcon1 = icons[this.state.customPing1];
    const customIcon2 = icons[this.state.customPing2];
    const customIcon3 = icons[this.state.customPing3];

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

            <Picker
              style={[styles.picker]} itemStyle={styles.onePickerItem}
              selectedValue={this.state.customPing1}
              onValueChange={(itemValue) => this.setState({customPing1: itemValue})}
            >
              <Picker.Item label="None" value="none" />
              <Picker.Item label="Home" value="home" />
              <Picker.Item label="Work" value="work" />
              <Picker.Item label="School" value="school" />
              <Picker.Item label="Emergency" value="emergency" />
              <Picker.Item label="Food" value="food" />
              <Picker.Item label="Drinks" value="drinks" />
              <Picker.Item label="Coffee" value="coffee" />
            </Picker>
            <Image
               style={{width: 25, height: 25}}
               source={customIcon1}
             />

            <Picker
              style={[styles.picker]} itemStyle={styles.onePickerItem}
              selectedValue={this.state.customPing2}
              onValueChange={(itemValue) => this.setState({customPing2: itemValue})}
            >
              <Picker.Item label="None" value="none" />
              <Picker.Item label="Home" value="home" />
              <Picker.Item label="Work" value="work" />
              <Picker.Item label="School" value="school" />
              <Picker.Item label="Emergency" value="emergency" />
              <Picker.Item label="Food" value="food" />
              <Picker.Item label="Drinks" value="drinks" />
              <Picker.Item label="Coffee" value="coffee" />
            </Picker>
            <Image
               style={{width: 25, height: 25}}
               source={customIcon2}
             />

            <Picker
              style={[styles.picker]} itemStyle={styles.onePickerItem}
              selectedValue={this.state.customPing3}
              onValueChange={(itemValue) => this.setState({customPing3: itemValue})}
            >
              <Picker.Item label="None" value="none" />
              <Picker.Item label="Home" value="home" />
              <Picker.Item label="Work" value="work" />
              <Picker.Item label="School" value="school" />
              <Picker.Item label="Emergency" value="emergency" />
              <Picker.Item label="Food" value="food" />
              <Picker.Item label="Drinks" value="drinks" />
              <Picker.Item label="Coffee" value="coffee" />
            </Picker>
            <Image
               style={{width: 25, height: 25}}
               source={customIcon3}
             />



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
  },
  picker: {
    width: 200,
    height: 44,
    borderColor: 'black',
    borderWidth: 1,
  },
  onePickerItem: {
    height: 44,
    color: 'red'
  },
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
