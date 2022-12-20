import { observer } from "mobx-react-lite";
import React, {useState} from "react";

import {
    Table,
    TableTr,
    TableTd,
    StyledModal,
    StyledModalContent,
    StyledModalTitle,
    StyledLabelText
} 
from "../styles/styles"

import SubTitle from "./UI/Subtitle";
import Button from "../components/UI/Button";
// modal
import Modal from "../components/Modal/Modal";


const OrderItem = observer(({setActive, order, id, changeStatusById}) => {
    const orderId = order.id;
    const [modalActive, setModalActive] = useState(false)
    const [modalPosActive, setModalPosActive] = useState(false)

    const elem1 = {
        'marginTop': '20px',
        'display': 'flex',
        'justifyContent': 'flex-end'
    }

    return (
        <>
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
                    {order.total}
                </TableTd>
                <TableTd>
                    {order.orderStatus}
                </TableTd>
                <TableTd onClick={changeStatusById} id={orderId}>
                    <Button padding={"10px"} onClick={() => setActive(true)}>Изменить</Button>
                </TableTd>
                <TableTd>
                    <Button padding={"10px"} onClick={() => setModalActive(true)}>Подробнее</Button>
                </TableTd>
            </TableTr>
            <Modal>
                <StyledModal active={modalActive} onClick={() => setModalActive(false)}>
                    <StyledModalContent onClick={(e) => e.stopPropagation()}>
                        <SubTitle>Заказ № {id + 1}</SubTitle>
                        <Table>
                            <TableTr>
                                <TableTd>
                                    Название
                                </TableTd>
                                <TableTd>
                                    Количество   
                                </TableTd>
                                <TableTd>
                                    Цена   
                                </TableTd>
                                <TableTd>
                                   Рецепт   
                                </TableTd>
                            </TableTr>
                            {order.positions.map((pos) => 
                                <>
                                    <TableTr>
                                        <TableTd>
                                            {pos.title}
                                        </TableTd>
                                        <TableTd>
                                            1
                                        </TableTd>
                                        <TableTd>
                                            {pos.price}
                                        </TableTd>
                                        <TableTd>
                                            <Button padding={"10px"} onClick={() => setModalPosActive(true)}>Подробнее</Button>
                                        </TableTd>
                                    </TableTr>
                                    <Modal>
                                        <StyledModal active={modalPosActive} onClick={() => setModalPosActive(false)}>
                                            <StyledModalContent onClick={(e) => e.stopPropagation()}>
                                                <SubTitle>Рецепт</SubTitle>
                                                <StyledLabelText>{pos.description}</StyledLabelText>
                                            </StyledModalContent>
                                        </StyledModal>
                                    </Modal>
                                </>
                            )}
                        </Table>
                        <StyledModalTitle style={elem1}><span>Статус: <b>{order.orderStatus}</b></span></StyledModalTitle>
                        <StyledModalTitle>Общая стоимость: <b>{order.total}</b></StyledModalTitle>
                    </StyledModalContent>
                </StyledModal>
            </Modal>
        </>

    )
})

export default OrderItem