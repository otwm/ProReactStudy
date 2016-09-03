import fs from "fs";
import express from "express";
import React from "react";
import {renderToString} from "react-dom/server";
import ContactsApp from "./app/components/ContactsApp";

const app = express();

app.set('view engine', 'ejs');
app.set('views', './');
app.use(express.static(__dirname + './public'));

const contacts = JSON.parse(fs.readFileSync(__dirname + '/public/contacts.json', 'utf8'));

const ContactsAppFactory = React.createFactory(ContactsApp);

app.get('/', (request, response) => {
    let componentInstance = ContactsAppFactory({initialData: contacts});
    response.render('index', {
        content: renderToString(componentInstance)
    });
});

app.listen(3000, ()=> {
    console.log('app');
})
