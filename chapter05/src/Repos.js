import React, {Component} from 'react';
import 'whatwg-fetch';

class Repos extends Component {

    constructor() {
        super(...arguments);
        this.state = {
            repositories: []
        }
    }

    componentDidMount() {
        fetch('https://api.github.com/users/pro-react/repos')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({repositories: responseData})
            });
    }

    render() {
        let repos = this.state.repositories.map((repo) => (
            <li key={repo.id}>{repo.name}</li>
        ));
        return (
            <div>
                <h1>Github Repos</h1>
                <ul>
                    {repos}
                </ul>
            </div>
        );
    }
}

export default Repos;