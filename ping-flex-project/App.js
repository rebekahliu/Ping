import React from 'react';

import { StackNavigator } from 'react-navigation';
import Login from './App/components/login';
import HomeScreen from './App/components/home_screen';


const App = StackNavigator({
    Login: { screen: Login},
    HomeScreen: { screen: HomeScreen},
})

export default App;
