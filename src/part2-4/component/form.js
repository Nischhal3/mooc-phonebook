import React from 'react';

const Form = (props) => {

    return (
        <form onSubmit={props.addPerson}>
            <div>
                name:  <input placeholder='name' value={props.newPerson} onChange={props.handleNameChange} />
            </div>
            <div>
                number: <input placeholder='number' value={props.newNumber} onChange={props.handleNumberChange} />
            </div>
        </form>
    )
}

export default Form;