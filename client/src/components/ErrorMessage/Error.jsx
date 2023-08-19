import React from 'react';
import './Error.scss'

const Error = ({ error }) => {
    return (
        <span className='error'>
            { error }
        </span>
    );
};

export default Error;