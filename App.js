import React from 'react';
import { StackNavigator } from 'react-navigation';

//pages imports
import LoginPage from './app/pages/LoginPage';
import HomePage from './app/pages/HomePage';
import RegisterPage from './app/pages/RegisterPage';

const App = StackNavigator({
    LoginPage: { screen: LoginPage },
    HomePage: { screen: HomePage }, 
    RegisterPage: { screen: RegisterPage }
});

export default App;