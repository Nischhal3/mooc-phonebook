import React from 'react';
const Button = ({ addPerson }) => {
    return (
        <button type='submit' onClick={addPerson} >Submit</button>
    )
}

export default Button;