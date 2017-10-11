import React, { Component } from 'react';

import {Provider} from 'react-redux';

import { StackNavigator } from 'react-navigation';
import Login from './app/components/login';
import HomeScreen from './app/components/home_screen';
import PingMap from './app/components/ping_map';


import configureStore from './app/store/store';


const AppNav = StackNavigator({
    Login: { screen: Login},
    HomeScreen: { screen: HomeScreen},
    PingMap: { screen: PingMap },
})

class App extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <AppNav />
      </Provider>
    );

  };
}



export default App;
