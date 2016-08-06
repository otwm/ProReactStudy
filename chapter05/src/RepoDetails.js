import React, {Component} from 'react';
import 'whatwg-fetch';

class RepoDetails extends Component {

    renderRepository() {
        let repository = this.props.repositories.find(
            (repo) => repo.name == this.props.params.repoName
        );

        let stars = [];
        for (var index = 0; index < repository.stargazers_count; index++) {
            stars.push('★');
        }

        return (
            <div>
                <h2>{repository.name}</h2>
                <p>{repository.description}</p>
                <span>{stars}</span>
            </div>
        )
    }

    render() {
        if (this.props.repositories.length > 0) {
            return this.renderRepository();
        } else {
            return <h4>Loading...</h4>;
        }
    }
}

export default RepoDetails;