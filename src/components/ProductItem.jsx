import { observer } from "mobx-react-lite";
import React from "react";


import close from "../static/image/icons/close.svg"

//ui
import Image from "./UI/Image";
import {
            Card,
            CardTitle,
            CardClose,
            CardDescription
        } from "../styles/styles"


const ProductItem = observer(({product, addProductCountByClick}) => {
    const id = product.id;

    const style = {
        display: 'flex',
        justifyContent: 'space-between'
    }

    return (
        <Card id={id} onClick={addProductCountByClick}>
            <CardClose></CardClose> 
            <Image src={product.photo} alt={product.name}/>
            <CardTitle>{product.name}</CardTitle>
            <div style={style}>
                <CardDescription>Количеcтво:</CardDescription>
                <CardDescription>{product.count}</CardDescription>
            </div>
        </Card>
    )
})

export default ProductItem