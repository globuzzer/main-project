import React from 'react';
import {Route} from 'react-router-dom';
import SignUpSection from './SignUpSection';
import Package from './Package';
const SignUpPage = ({match}) => {
    return (
        <div>
            <Route exact path={`${match.path}`} component={SignUpSection}/>
            <Route path ={`${match.path}/:city`} component={Package}/>
        </div>
    );
}

export default SignUpPage;
