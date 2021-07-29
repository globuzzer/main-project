import React from 'react'
import { Redirect } from 'react-router-dom'

const Landing = () => {
    console.log('landing')
    // let history = useHistory();

    // history.push('/');

    return (
        <Redirect to='/' />
    )
}

export default Landing
