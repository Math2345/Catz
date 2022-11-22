import React, {useContext, useEffect, useState} from "react";

import { observer } from "mobx-react-lite";
import { Context } from "..";

import 'react-tabs/style/react-tabs.css';

// role
import { NEWROLES, ROLES } from "../utils/consts"


// api 
import { findAllUsers, PermitRole, findById } from "../http/UserApi";


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
import { parseRoleToNewRole, parseNewRoleToRole } from "../helper/parseRole.js"



const Admin = observer(() => {
    const {usersStore} = useContext(Context)

    const [modalActive, setModalActive] = useState(false)
    const [selectedRole, setSelectedRole] = useState('')
    const [selectedId, setSelectedId] = useState(0)

    useEffect(() => {

        findAllUsers().then(data => usersStore.addUsers(data));
    }, [])

    //const newUsers = parseRoleToNewRole(users, NEWROLES)


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


    return (
        <>
            <ContainerHeader>
                <Title>Админ панель</Title>
            </ContainerHeader>
            <ShopHeaderWr>
                <LogoWr><Image src={LogoImg} alt="logo"/></LogoWr>
            </ShopHeaderWr>
            <TabElem setActive={setModalActive}  changeRoleById={changeRoleById}/> 
            <Modal>
                <StyledModal active={modalActive} onClick={() => setModalActive(false)}>
                    <StyledModalContent onClick={(e) => e.stopPropagation()}>
                        <StyledModalTitle>Изменить роль</StyledModalTitle>
                        <StyledLabelText>Роль:</StyledLabelText>
                        <Select 
                                changeSelect={changeSelect} 
                                roles={NEWROLES}>
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
        </>
    )
})


export default Admin


