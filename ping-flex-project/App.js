import React, { Component } from 'react';

import {Provider} from 'react-redux';

import { StackNavigator } from 'react-navigation';
import Login from './app/components/login';
import HomeScreen from './app/components/home_screen';
import SuggestedFriends from './app/components/suggested_friends';
import AddedMe from './app/components/added_me';
import PingMap from './app/components/ping_map';
import Profile from './app/components/profile';
import ProfileSettings from './app/components/profile_settings';

import configureStore from './app/store/store';


const AppNav = StackNavigator({
    Login: { screen: Login },
    HomeScreen: { screen: HomeScreen },
    PingMap: { screen: PingMap},
    SuggestedFriends: { screen: SuggestedFriends },
    AddedMe: { screen: AddedMe },
    Profile: { screen: Profile },
    ProfileSettings: { screen: ProfileSettings },
});

class App extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <AppNav />
      </Provider>
    );
  }
}



export default App;
