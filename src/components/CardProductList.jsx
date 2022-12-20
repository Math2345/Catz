import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";


//container
import CardProduct from "./CardProduct";

//styles
import { CartContainer } from "../styles/styles"

const CardProductList = observer(({items, plusCount,  minuisCount, removePositionsInCart}) => {

    return (
        <CartContainer сolumn={"1fr"}>
            {items.map((positionInCart) =>
                <CardProduct
                    key={positionInCart.id}
                    positionInCart={positionInCart}
                    plusCount={plusCount} minuisCount={minuisCount}
                    removePositionsInCart={removePositionsInCart}
                />
            )}
        </CartContainer>
    )
})

export default CardProductList 