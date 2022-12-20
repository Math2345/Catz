import React, { useContext } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";

//ui
import Image from "./UI/Image";
import {        
            CardInCart, 
            CardInCartCounter,
            CardInCartCounterRes,
            CardTitleInCart,
            CardPriceInCart
        } 
        
        from "../styles/styles"

import Button from "./UI/Button";

const CardProductItem = observer(({positionInCart, plusCount, minuisCount, removePositionsInCart}) => {
    const { cartStore } = useContext(Context)

    const id = positionInCart.id;

    return (
        <CardInCart id={id}>
            <Image margin={'0 52px 0 0'} w={"110px"} src={positionInCart.img} alt={positionInCart.title}/>
            <CardTitleInCart>{positionInCart.title}</CardTitleInCart>
            <CardPriceInCart>Цена: <br></br>{positionInCart.price}P</CardPriceInCart>
            <CardInCartCounter>
                <Button  onClick={() => minuisCount(positionInCart.id)} raduis={'5px 0 0 5px'} size={'14px'} padding={"3px 6px"}>-</Button>
                <CardInCartCounterRes>{positionInCart.count}</CardInCartCounterRes>
                <Button  onClick={() => plusCount(positionInCart.id)} raduis={'0 5px 5px 0'} size={'14px'} padding={"3px 6px"}>+</Button>
            </CardInCartCounter>
            <CardPriceInCart>Итого: <br></br>{positionInCart.totalPrice}P</CardPriceInCart>
            <Button w={'inherit'} padding={"10px"} onClick={() => removePositionsInCart(positionInCart.id)}>Удалить</Button>
        </CardInCart>
    )
})

export default CardProductItem