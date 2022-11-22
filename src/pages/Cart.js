import React, {useContext} from "react";

import { Context } from "..";

// ui
import Title from "../components/UI/Title";
import Image from "../components/UI/Image";


// logo
import LogoImg from "../static/image/logo.svg"

import { observer } from "mobx-react-lite";

//styles
import { ShopHeaderWr, ShopMainWr, LogoWr } from "../styles/styles"


const CART = observer(() => {
    const {product} = useContext(Context)


    return(
        <>  
            <ShopHeaderWr>
                <LogoWr><Image src={LogoImg} alt="logo"/></LogoWr>
                <Title>Корзина</Title>
            </ShopHeaderWr>
        </>
    )
})

export default CART