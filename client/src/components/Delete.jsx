import React, {useContext} from 'react';
import {AuthContext} from "../context/AuthContext";

const Delete = () => {
    const { fullName } = useContext(AuthContext)

    return (
        <div>
            Ви бажаєте видалити акаунт <span style={{color: 'red'}}>{fullName}</span> ?
        </div>
    );
};

export default Delete;