import React, {Component} from 'react';
import 'whatwg-fetch';

class RepoDetails extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            repository: {}
        };
    }

    fetchData(repoName) {
        fetch('https://api.github.com/repos/pro-react/' + repoName)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({repository: responseData})
            });
    }

    componentDidMount() {
        let repoName = this.props.params.repoName;
        this.fetchData(repoName);
    }

    componentWillReceiveProps(nextProps) {
        let repoName = nextProps.params.repoName;
        this.fetchData(repoName);
    }

    render() {
        let stars = [];
        for (var index = 0; index < this.state.repository.stargazers_count; index++) {
            stars.push('★');
        }

        return (
            <div>
                <h2>{this.state.repository.name}</h2>
                <p>{this.state.repository.description}</p>
                <span>{stars}</span>
            </div>
        )
    }
}

export default RepoDetails;