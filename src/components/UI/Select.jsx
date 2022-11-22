import React from "react";


const Select = ({changeSelect, roles}) => {
    const options = roles.map((role, index) => {
        return <option value={index} key={index}>{role}</option>
    })

    return (
        <select onChange={changeSelect}>
            {options}   
        </select>
    )
}

export default Select;