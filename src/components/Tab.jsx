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
import OrderItem from "./OrderItem";

// ui

import Button from "../components/UI/Button";
import SubTitle from "../components/UI/Subtitle";

const TabElem = observer(({setActive, setModalActiveStatus, changeRoleById, changeStatusById}) => {
    const {usersStore} = useContext(Context)
    const {ordersStore} = useContext(Context)

    const stylePanel = {
        'marginTop': '10px'
    }


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
                    {usersStore.users.length === 0 ? <div style={stylePanel}>Таких пользователей нет</div>
                    :
                    usersStore.users.map((user, index) => 
                    <UserItem 
                        setActive={setActive}
                        key={user.id} 
                        user={user} 
                        id={index}
                        changeRoleById={changeRoleById} 
                    />)}
                </Table>
            </TabPanel>
            <TabPanel>
                <SubTitle>История заказов</SubTitle>
                <Table>
                    <TableTr>
                        <TableTd>
                            №
                        </TableTd>
                        <TableTd>
                            Дата    
                        </TableTd>
                        <TableTd>
                            Время   
                        </TableTd>
                        <TableTd>
                            Сумма     
                        </TableTd>
                        <TableTd>
                            Статус    
                        </TableTd>
                        <TableTd>
                            Редактировать    
                        </TableTd>
                        <TableTd>
                               
                        </TableTd>
                    </TableTr>
                    {
                        ordersStore.getOrders().length === 0 ? <div style={stylePanel}>Заказов пока нет!</div>
                        : ordersStore.getOrders().map((order, index) => 
                            <OrderItem 
                                setActive={setModalActiveStatus}
                                key={order.id} 
                                order={order} 
                                id={index}
                                changeStatusById={changeStatusById}
                            /> 
                    )}
                </Table>
            </TabPanel>
        </Tabs>
    )
})

export default TabElem