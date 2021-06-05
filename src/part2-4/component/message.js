import React from 'react';

const Message = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <h1 className="error">
            {message}
        </h1>
    )
}

export default Message;