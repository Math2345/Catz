import { observer } from "mobx-react-lite";
import React, {useRef} from "react";

//ui
import Image from "./UI/Image";
import {
            Card,
            CardTitle,
            CardPrice
        } from "../styles/styles"
import Button from "./UI/Button";

const PositionItem = observer(({position, addPositionToCart}) => {
    const id = position.id;

    return (
        <Card id={id} onClick={addPositionToCart}>
            <Image src={position.photo} alt={position.title}/>
            <CardTitle>{position.title}</CardTitle>
            <CardPrice>{position.price}P</CardPrice>
            <Button w = {'inherit'} padding={"5px 10px"}>Добавить</Button>
        </Card>
    )
})

export default PositionItem