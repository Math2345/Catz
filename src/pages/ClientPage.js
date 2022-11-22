import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Context } from "..";


// ui
import SubTitle from "../components/UI/Subtitle";
import Image from "../components/UI/Image";
import Button from "../components/UI/Button";


// logo
import LogoImg from "../static/image/logo.svg"
import CartIcon from "../static/image/cart.svg"

//styles

import { HeaderWr, LogoWr } from "../styles/styles"

// container
import PositionList from "../components/PositionList";


const ClientPage = observer(() => {
    const {positionsStore} = useContext(Context)

    console.log('!')


    const addPositionToCart = () => {
        console.log('В корзину!')
    }

    positionsStore.positions.map((position) => 
        console.log(position)          
    );


    return (
        <>
            <HeaderWr>
                <LogoWr><Image src={LogoImg} alt="logo" /></LogoWr>
                <SubTitle>Блюда</SubTitle>
                <Button image={CartIcon} size={"20px"} padding={"20px"} color={"#337EAA"}></Button>
            </HeaderWr>
            <PositionList addPositionToCart={addPositionToCart}/>
        </>
    )
})

export default ClientPage