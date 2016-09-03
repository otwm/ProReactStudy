import React, {Component, PropTypes} from 'react';
import ContactList from './ContactList';
import SearchBar from './SearchBar';

class ContactsApp extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            contacts: this.props.initialData || [],
            filterText: ''
        }
    }

    handleUserInput(searchTerm) {
        this.setState({filterText: searchTerm});
    }

    render() {
        return (
            <div>
                <SearchBar filterText={this.state.filterText}
                           onUserInput={this.handleUserInput.bind(this)}/>
                <ContactList filterText={this.state.filterText} contacts={this.state.contacts}/>
            </div>
        );
    }
}

ContactsApp.propType = {
    initialData: PropTypes.any
};

export default ContactsApp;