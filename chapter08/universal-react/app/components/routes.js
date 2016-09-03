import React from "react";
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import ContactsApp from "./app/components/ContactsApp";

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="contacts" component={ContactsApp}/>
    </Route>
);