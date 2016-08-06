import React, {Component} from 'react';
import 'whatwg-fetch';
import {Link} from 'react-router';

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
            <li key={repo.id}>
                <Link to={"/repo/" + repo.name }>{repo.name}</Link>
            </li>
        ));

        let child = this.props.children && React.cloneElement(
                this.props.children, {repositories: this.state.repositories}
            );

        return (
            <div>
                <h1>Github Repos</h1>
                <ul>
                    {repos}
                </ul>
                {child}
            </div>
        );
    }
}

export default Repos;