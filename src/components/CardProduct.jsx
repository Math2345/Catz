import React from "react";


//ui
import Image from "./UI/Image";
import {        
            CardInCart, 
            CardPrice,
            CardInCartCounter,
            CardInCartCounterRes
        } 
        
        from "../styles/styles"

import Button from "./UI/Button";

const CardProductItem = observer(({product}) => {

    return (
        <CardInCart>
            <Image src={product.photo} alt={product.title}/>
            <CardTitle>{product.title}</CardTitle>
            <CardPrice>Цена {product.price}</CardPrice>
            <CardInCartCounter>
                <Button>-</Button>
                <CardInCartCounterRes>1</CardInCartCounterRes>
                <Button>+</Button>
            </CardInCartCounter>
            <CardPrice>Итого: {product.price}</CardPrice>
            <Button padding={"10px"}>Удалить</Button>
        </CardInCart>
    )
})

export default CardProductItem