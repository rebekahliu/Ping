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
} from 'react-native';

class ProfileSettings extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      visibilityRadius: 0,
    };

  }

  static navigationOptions = ({ navigation }) => ({
      title: 'Settings',
      headerBackTitle: null,
      headerRight: <Button title="Done" onPress={() => {navigation.state.params.handleSave(navigation)}} />,
  });


  saveDetails(navigation) {
    //save the details based on state, then go back
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
          value={this.state.visibilityRadius}
          onValueChange={(value) => this.setState({visibilityRadius: value})}

          />
          <Text>
            Visibility Radius {this.state.visibilityRadius}mi.
          </Text>
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
    currentUser: state.session.current_user,
  };
}

export default connect(mapStateToProps, null)(ProfileSettings);
