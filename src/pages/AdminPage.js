import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom'

import { observer } from "mobx-react-lite";
import { Context } from "..";

import 'react-tabs/style/react-tabs.css';

// roles and status
import { NEWROLES, ROLES, STATUS, NEWSTATUS, FILTERNAME, UNAUTHORIZED_ROUTE } from "../utils/consts"


// api 
import { findAllUsers, PermitRole, findById, userByRole } from "../http/UserApi";
import { findAll, changeStatus } from "../http/OrderApi"


// logo
import LogoImg from "../static/image/logo.svg"

// modal
import Modal from "../components/Modal/Modal";

// сontainer
import TabElem from "../components/Tab";


// ui
import Title from "../components/UI/Title";
import Image from "../components/UI/Image";
import Button from "../components/UI/Button";
import Select from "../components/UI/Select";

import {
            ContainerHeader,
            ShopHeaderWr,
            LogoWr,
            StyledModal,
            StyledModalContent,
            StyledModalTitle,
            StyledLabelText,
        } 
        from "../styles/styles"


// helper
import { parseNewRoleToRole, parseNewStatusToStatus } from "../helper/parseRole.js"



const Admin = observer(() => {
    const {usersStore} = useContext(Context)
    const {ordersStore} = useContext(Context)

    const [modalActive, setModalActive] = useState(false)
    const [selectedRole, setSelectedRole] = useState('')
    const [selectedId, setSelectedId] = useState(0)

    const [selectedStatusId, setSelectedStatusId] = useState(0)
    const [selectedStatus, setSelectedStatus] = useState('')
    const [modalActiveStatus, setModalActiveStatus] = useState(false)

    const [modalActiveFilter, setModalActiveFilter] = useState(false)
    const [selectedUserByRole, setSelectedUserByRole] = useState('')

    const navigate = useNavigate()


    useEffect(() => {
        findAllUsers().then(data => usersStore.addUsers(data));
        findAll().then(data => {
            const newOrders = setNewOrder(data)

            ordersStore.addOrders(newOrders)
        })
    }, [])


    const setNewOrder = (orders) => {
        const newOrders = orders.map((order) => {
            const newDate = parserDate(order.timestamp)
            const totalPrice = sumPrice(order.positions)

            return  {
                id: order.id,
                user: order.userId,
                date: newDate[0],
                time: newDate[1],
                total: totalPrice,
                orderStatus: order.orderStatus, 
                positions: order.positions
            }
        })
        
        return newOrders
    }

    const sumPrice = (positions) => {
        let sum = 0;

        for (let i = 0; i < positions.length; i++) {
            sum += positions[i].price
        }

        return sum
    }

    const parserDate = (timestamp) => {
        const dateArray = timestamp.split('T')
        const posSymbol = dateArray[1].indexOf('.')
        const newTime = dateArray[1].slice(0, posSymbol)

        return [dateArray[0], newTime]
    }

    const changeSelect = (event) => {
        const index = event.target.selectedIndex
        const role = parseNewRoleToRole(ROLES, index)

        setSelectedRole(role)
    }

    const changeRoleById = (e) => { 
        const elem = e.currentTarget;
        const id = elem.getAttribute('id');

        setSelectedId(id)
    }


    const changeRoleByClick = async (e) => {
        await PermitRole(selectedRole, selectedId)

        const changedUser = await findById(selectedId);

        const usersstore = usersStore.users
        const newChangedUsers = usersstore.map((user) => user.id !== changedUser.id ? user : changedUser)

        usersStore.addUsers(newChangedUsers)

        setModalActive(false)
    }

    const changeStatusById = (e) => {
        const elem = e.currentTarget;
        const id = elem.getAttribute('id');

        setSelectedStatusId(id)
    }

    const changeSelectStatus = (event) => {
        const index = event.target.selectedIndex
        const status = parseNewStatusToStatus(STATUS, index)

        setSelectedStatus(status)
    }


    const changeStatusByClick = async(e) => {
        await changeStatus(selectedStatusId, selectedStatus)
        const orders = await findAll()
        const newOrders = setNewOrder(orders)

        newOrders.sort((a, b) => a.id > b.id ? 1 : -1);

        ordersStore.addOrders(newOrders)

        setModalActiveStatus(false)
    }

    const changeUserByRole = (event) => {
        const index = event.target.selectedIndex
        const role = parseNewRoleToRole(ROLES, index)

        setSelectedUserByRole(role)
    }

    const changeUserByRoleByClick = async(e) => {
        if (selectedUserByRole === 'ROLE_ADMIN') {
            const findAll = await findAllUsers()
            usersStore.addUsers(findAll)

            return;
        } 

        const usersByRole = await userByRole(selectedUserByRole)
        usersStore.addUsers(usersByRole)

        setModalActiveFilter(false)
    } 
    
    const logoout = () => {
        sessionStorage.setItem('id', '')
        sessionStorage.setItem('login', '')
        sessionStorage.setItem('role', '')

        navigate(UNAUTHORIZED_ROUTE)
    }


    return (
        <>
            <ContainerHeader>
                <Title>Админ панель</Title>
            </ContainerHeader>
            <ShopHeaderWr>
                <LogoWr><Image src={LogoImg} alt="logo"/></LogoWr>
                <Button
                                padding={"5px 10px"}
                                color={"#000"}
                                onClick={logoout}
                    >           Выйти из аккаунта
                </Button>
            </ShopHeaderWr>
            <div><Button
                            padding={"5px 10px"}
                            color={"#008C95"}
                            onClick={() => setModalActiveFilter(true)}
                >           Фильтр
                </Button>
            </div>
            <TabElem 
                    setActive={setModalActive}
                    setModalActiveStatus={setModalActiveStatus}  
                    changeRoleById={changeRoleById}
                    changeStatusById={changeStatusById}
            /> 
            <Modal>
                <StyledModal active={modalActiveStatus} onClick={() => setModalActiveStatus(false)}>
                    <StyledModalContent onClick={(e) => e.stopPropagation()}>
                        <StyledModalTitle>Изменить статус</StyledModalTitle>
                        <StyledLabelText>Статус:</StyledLabelText>
                        <Select 
                                changeSelect={changeSelectStatus} 
                                elems={NEWSTATUS}>
                        </Select>
                        <Button
                            onClick={changeStatusByClick}
                            padding={"5px 10px"}
                            color={"#008C95"}>
                            Изменить
                        </Button>
                    </StyledModalContent>
                </StyledModal>
            </Modal>
            <Modal>
                <StyledModal active={modalActive} onClick={() => setModalActive(false)}>
                    <StyledModalContent onClick={(e) => e.stopPropagation()}>
                        <StyledModalTitle>Изменить роль</StyledModalTitle>
                        <StyledLabelText>Роль:</StyledLabelText>
                        <Select 
                                changeSelect={changeSelect} 
                                elems={NEWROLES}>
                        </Select>
                        <Button
                            onClick={changeRoleByClick}
                            padding={"5px 10px"}
                            color={"#008C95"}>
                            Изменить
                        </Button>
                    </StyledModalContent>
                </StyledModal>
            </Modal>
            <Modal>
                <StyledModal active={modalActiveFilter} onClick={() => setModalActiveFilter(false)}>
                    <StyledModalContent onClick={(e) => e.stopPropagation()}>
                        <StyledModalTitle>Применить фильтр</StyledModalTitle>
                        <Select 
                                changeSelect={changeUserByRole}
                                elems={FILTERNAME}>
                        </Select>
                        <Button
                            onClick={changeUserByRoleByClick}
                            padding={"5px 10px"}
                            color={"#008C95"}>
                            Изменить
                        </Button>
                    </StyledModalContent>
                </StyledModal>
            </Modal>     
        </>
    )
})


export default Admin


