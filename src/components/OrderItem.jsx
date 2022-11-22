import { observer } from "mobx-react-lite";
import React from "react";

import {
    TableTr,
    TableTd,
} 
from "../styles/styles"

import Button from "../components/UI/Button";


const OrderItem = observer(({removeProductInCart, order}) => {
    const orderId = order.id;

    return (
       <TableTr>
            <TableTd>
                {id + 1}
            </TableTd>
            <TableTd>
                {order.date}
            </TableTd>
            <TableTd>   
                {order.time}
            </TableTd>
            <TableTd>   
                {order.totalPrice}
            </TableTd>
            <TableTd onClick={removeProductInCart} orderId={orderId}>
                <Button padding={"10px"} onClick={() => setActive(true)}>Изменить статус</Button>
            </TableTd>
        </TableTr>
    )
})

export default OrderItem