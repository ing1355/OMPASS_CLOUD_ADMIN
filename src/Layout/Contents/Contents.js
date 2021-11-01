import React from 'react';
import './Contents.css'
import { Switch, Route, Redirect, withRouter, useHistory } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';

const Contents = () => {
    return <>
        <div className="contents">
            <Switch>
                <Route path="/" component={Dashboard} />
            </Switch>
        </div>
    </>
}

export default Contents;