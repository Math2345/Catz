import { observer } from "mobx-react-lite";
import React from "react";

//ui
import Image from "./UI/Image";
import {
            Card,
            CardTitle,
            CardPrice
        } from "../styles/styles"
import Button from "./UI/Button";

const PositionItem = observer(({position, addPositionToCart}) => {

    return (
        <Card>
            <Image src={position.photo} alt={position.title}/>
            <CardTitle>{position.title}</CardTitle>
            <CardPrice>{position.price}</CardPrice>
            <Button padding={"5px 10px"} onClick={addPositionToCart}>В корзину</Button>
        </Card>
    )
})

export default PositionItem