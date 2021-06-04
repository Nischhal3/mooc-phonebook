import React from 'react';
const Filter = (props) => {
    return (
        <div>
            filter shown with <input placeholder='search...' onChange={props.handleSearch} value={props.search} />
        </div>
    )
}

export default Filter;