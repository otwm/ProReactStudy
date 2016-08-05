import React, {Component} from 'react';
import {render} from 'react-dom';

import About from './About';
import Home from './Home';
import Repos from './Repos';
import RepoDetails from './RepoDetails';

import {Router, Route, Link, IndexRoute} from 'react-router';

class App extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            route: window.location.hash.substr(1)
        };
    }

    componentDidMount() {
        window.addEventListener('hashchange', ()=> {
            console.log('test');
            this.setState({
                route: window.location.hash.substr(1)
            })
        });
    }

    render() {
        var Child;
        switch (this.state.route) {
            case '/about':
                Child = About;
                break;
            case '/repos':
                Child = Repos;
                break;
            default:
                Child = Home;
        }

        return (
            <div>
                <header>App</header>
                <menu>
                    <ul>
                        <li><Link to="/about" activeClassName="active">About</Link></li>
                        <li><Link to="/repos" activeClassName="active">Repos</Link></li>
                    </ul>
                </menu>
                {this.props.children}
            </div>
        );
    }
}

render((
    <Router>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="about" component={About}/>
            <Route path="repos" component={Repos}>
                <Route path="details/:repoName" component={RepoDetails}/>
            </Route>
        </Route>
    </Router>
), document.getElementById('root'));