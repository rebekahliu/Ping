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

// import {icons} from '../../assets/icons';


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
      headerLeft: null,
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

    const pingMessages = {
      'default': "",
      none: "",
      home: "Hey, are you home?",
      food: "Hey, want to get food?",
      emergency: "Are you ok?",
      school: "Hey, are you at school?",
      work: "Hey, are you at work?",
      drinks: "Hey, want to get drinks?",
      coffee: "Hey, want to grab coffee?",
    };

    const icons = {
      'home'  : require('../../assets/icons/homePing.png'),
      'emergency'    : require('../../assets/icons/emergencyPing.png'),
      'food'    : require('../../assets/icons/foodPing.png'),
      'work'    : require('../../assets/icons/workPing.png'),
      'drinks'    : require('../../assets/icons/drinksPing.png'),
      'school'    : require('../../assets/icons/schoolPing.png'),
      'coffee'    : require('../../assets/icons/coffeePing.png'),
    }

    const name = this.props.currentUser.name;
    const customIcon1 = icons[this.state.customPing1];
    const customIcon2 = icons[this.state.customPing2];
    const customIcon3 = icons[this.state.customPing3];

    return(
      <View style={styles.container}>
        <Text style={styles.header}>DISCOVERY SETTINGS</Text>
        <View style={styles.visibleRadius}>
          <View style={styles.separatedTexts}>
            <Text>Visible Radius</Text>
            <Text>{this.state.visibleRadius}mi.</Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={this.state.visibleRadius}
            onValueChange={(value) => this.setState({visibleRadius: value})}
            />

        </View>
        <Text style={styles.description}>If friends are outside your visibility radius, they won't be able to ping you</Text>
        <View style={styles.showMe}>
          <Text>Show me on Ping </Text>

          <Switch
            style={styles.switch}
            value={this.state.findable}
            onValueChange={(value) => this.setState({findable: value})}
            />
        </View>

        <Text style={styles.description}>While turned off, your friends will not be able to get your location. Must be turned on to send pings</Text>
          <Text style={styles.header2}>CUSTOM PINGS</Text>
        <Text style={styles.description}>Customize your ping shortcuts to add a short message when you ping your friends</Text>
        <View style={styles.customPings}>
          <View style={styles.customPingItem}>
            <Picker
              style={[styles.picker]} itemStyle={styles.onePickerItem}
              selectedValue={this.state.customPing1}
              onValueChange={(itemValue) => this.setState({customPing1: itemValue})}
              >
              <Picker.Item label="Home" value="home" />
              <Picker.Item label="Work" value="work" />
              <Picker.Item label="School" value="school" />
              <Picker.Item label="Emergency" value="emergency" />
              <Picker.Item label="Food" value="food" />
              <Picker.Item label="Drinks" value="drinks" />
              <Picker.Item label="Coffee" value="coffee" />
            </Picker>
            <Text>{pingMessages[this.state.customPing1]}</Text>
            <Image
              style={{width: 25, height: 25}}
              source={customIcon1}
              />
          </View>
          <View style={styles.customPingItem}>
            <Picker
              style={[styles.picker]} itemStyle={styles.onePickerItem}
              selectedValue={this.state.customPing2}
              onValueChange={(itemValue) => this.setState({customPing2: itemValue})}
              >
              <Picker.Item label="Home" value="home" />
              <Picker.Item label="Work" value="work" />
              <Picker.Item label="School" value="school" />
              <Picker.Item label="Emergency" value="emergency" />
              <Picker.Item label="Food" value="food" />
              <Picker.Item label="Drinks" value="drinks" />
              <Picker.Item label="Coffee" value="coffee" />
            </Picker>
              <Text>{pingMessages[this.state.customPing2]}</Text>
            <Image
              style={{width: 25, height: 25}}
              source={customIcon2}
              />
          </View>
          <View style={[styles.customPingItem, styles.lastPingItem]}>
            <Picker
              style={[styles.picker]} itemStyle={styles.onePickerItem}
              selectedValue={this.state.customPing3}
              onValueChange={(itemValue) => this.setState({customPing3: itemValue})}
              >
              <Picker.Item label="Home" value="home" />
              <Picker.Item label="Work" value="work" />
              <Picker.Item label="School" value="school" />
              <Picker.Item label="Emergency" value="emergency" />
              <Picker.Item label="Food" value="food" />
              <Picker.Item label="Drinks" value="drinks" />
              <Picker.Item label="Coffee" value="coffee" />
            </Picker>
              <Text>{pingMessages[this.state.customPing3]}</Text>
            <Image
              style={{width: 25, height: 25}}
              source={customIcon3}
              />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#f7f7f7',
  },
  slider: {
    height: 10,
    width: 300,
    margin: 10,
  },
  picker: {
    width: 120,
    height: 88,
  },
  onePickerItem: {
    height: 88,
    color: 'black',
  },
  visibleRadius: {
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'lightgray',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 3,
  },
  separatedTexts: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  showMe: {
    backgroundColor: 'white',
    borderColor: 'lightgray',
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 5,
    marginBottom: 3,
  },
  customPings: {
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'lightgray',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  customPingItem: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'lightgray',
    borderBottomWidth: 1,
  },
  lastPingItem: {
    borderBottomWidth: 0,
  },
  header: {
    paddingLeft: 10,
    marginBottom: 10,
    fontSize: 14,
    color: '#5b5b5b',
  },
  header2: {
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 3,
    fontSize: 14,
    color: '#5b5b5b',
  },
  description: {
    paddingLeft: 10,
    marginBottom: 10,
    fontSize: 14,
    color: 'grey'
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
