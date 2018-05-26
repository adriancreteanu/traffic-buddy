import React from 'react';

//pages
import LoginPage from './app/pages/LoginPage';
import HomePage from './app/pages/HomePage';
import RegisterPage from './app/pages/RegisterPage';

//Navigation
import { StackNavigator } from 'react-navigation';
import AppContainer, { middleware } from './app/container/AppContainer';

//Redux
import { Provider, connect } from 'react-redux';
import { RootReducer } from "./app/common/redux/reducers/RootReducer";
import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';

class App extends React.Component {

    store: typeof createStore;

    constructor(props) {
        super(props);
        this.store = createStore(
            RootReducer,
            applyMiddleware(middleware)
        )

        console.disableYellowBox = true;
    }

    render() {
        return (
            <Provider store={this.store}>
                <AppContainer />
            </Provider>
        )
    }
}

export default App;