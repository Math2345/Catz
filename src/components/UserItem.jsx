import { observer } from "mobx-react-lite";
import React from "react";

import {
    TableTr,
    TableTd,
} 
from "../styles/styles"

import Button from "../components/UI/Button";


const UserItem = observer(({setActive, user, id, changeRoleById}) => {
    const userId = user.id;

    return (
       <TableTr>
            <TableTd>
                {id + 1}
            </TableTd>
            <TableTd>
                {user.login}
            </TableTd>
            <TableTd>   
                {user.role.name}
            </TableTd>
            <TableTd onClick={changeRoleById} id={userId}>
                <Button padding={"10px"} onClick={() => setActive(true)}>Изменить роль</Button>
            </TableTd>
        </TableTr>
    )
})

export default UserItem