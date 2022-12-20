import React from "react";


const Select = ({changeSelect, elems}) => {
    const options = elems.map((elem, index) => {
        return <option value={index} key={index}>{elem}</option>
    })

    return (
        <select onChange={changeSelect}>
            <option selected disabled>Выберите пункт</option>
            {options}   
        </select>
    )
}

export default Select;