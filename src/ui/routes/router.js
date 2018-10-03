import React from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import Users from "../userData/container/users";

const Routes = (props) => (
    <Router history={browserHistory}>
        <Route path='/'>
            <IndexRoute component={Users} />
        </Route>
    </Router>
)

export default Routes;
