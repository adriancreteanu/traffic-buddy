import React from 'react';
import { StackNavigator } from 'react-navigation';

//pages imports
import LoginPage from './app/pages/LoginPage';
import HomePage from './app/pages/HomePage';

const App = StackNavigator({
    LoginPage: { screen: LoginPage },
    HomePage: { screen: HomePage }
});

export default App;