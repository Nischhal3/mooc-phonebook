import React from 'react';

const Message = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <h4 className="error">
            {message}
        </h4>
    )
}

export default Message;