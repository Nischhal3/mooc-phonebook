import React from 'react';
const Details = ({ person, handleDelete }) => {
    //console.log(person);
    return (
        <div>
            {person.name}: {person.number}
            <button onClick={handleDelete.bind(null, person.id, person.name)}>Delete</button>
        </div>
    )
}

export default Details;