import fs from "fs";
import express from "express";
import React from "react";
import {renderToString} from "react-dom/server";
import {match} from "react-router";
import routes from "./app/routes";
import ContactsApp from "./app/components/ContactsApp";

const app = express();

app.set('view engine', 'ejs');
app.set('views', './');
app.use(express.static(__dirname + '/public'));

const contacts = JSON.parse(fs.readFileSync(__dirname + '/public/contacts.json', 'utf8'));

const ContactsAppFactory = React.createFactory(ContactsApp);

let renderRoute = (request, response) => {

};

app.get('*', (request, response) => {
    match({routes, location: request.url}, (error, redirectLocation, renderProps) => {
        if (error) {
            response.status(500).send(error.message);
        } else if (redirectLocation) {
            response.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (redirectLocation) {
            renderRoute(request, response);
        } else {
            response.status(404).send('Not found');
        }
    });
});

app.listen(3000, ()=> {
    console.log('app');
})
