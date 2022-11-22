import React, {useState, useContext} from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { Context } from ".."
import { observer } from "mobx-react-lite";

// styles

import "../styles/custom.css"
import {
    Table,
    TableTr,
    TableTd
} 
from "../styles/styles"

//container
import UserItem from "./UserItem";

// ui

import Button from "../components/UI/Button";
import SubTitle from "../components/UI/Subtitle";

const TabElem = observer(({setActive, changeRoleById}) => {
    const {usersStore} = useContext(Context)

    return (
        <Tabs>
            <TabList>
                <Tab>Участники</Tab>
                <Tab>История заказов</Tab>
            </TabList>

            <TabPanel>
                <SubTitle>Список пользователей</SubTitle>
                <Table>
                    <TableTr>
                        <TableTd>
                            №
                        </TableTd>
                        <TableTd>
                            Имя     
                        </TableTd>
                        <TableTd>
                            Роль     
                        </TableTd>
                        <TableTd>
                            Редактировать     
                        </TableTd>
                    </TableTr>
                    {usersStore.users.map((user, index) => 
                            <UserItem 
                                setActive={setActive}
                                key={user.id} 
                                user={user} 
                                id={index}
                                changeRoleById={changeRoleById} 
                            /> 
                    )}
                </Table>
            </TabPanel>
            <TabPanel>
                <SubTitle>История заказов</SubTitle>
            </TabPanel>
        </Tabs>
    )
})

export default TabElem