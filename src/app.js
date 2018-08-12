import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import AppRouter , {history} from './routers/AppRouter';
// import 'normalize.css/normalize.css';
import { startSetExpenses } from './actions/expenses';
import {login, logout} from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
import './styles/styles.scss';
import {firebase} from './firebase/firebase';
import 'react-dates/lib/css/_datepicker.css'

const store = configureStore();

// store.dispatch(addExpense({description:'water bill', amount: 500, createdAt: 200}))
// store.dispatch(addExpense({description:'gas bill', amount: 200, createdAt: 100}))
// store.dispatch(addExpense({description:'rent', amount: 297, createdAt: 1000}))

// const state = store.getState()
// const visibleExpenses = getVisibleExpenses(state.expenses,state.filters);
// console.log(visibleExpenses)

//Individual components can access the store

const jsx = (
    <Provider store = {store}>
        <AppRouter/>
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
}

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        store.dispatch(login(user.uid));
        // console.log('uuid',user.uid)
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if(history.location.pathname === '/') {
            history.push('/dashboard')
            }
        })
        // console.log('log in')
    }
    else {
        store.dispatch(logout());
        renderApp();
        // console.log('log out')
        history.push('/');
    }
})