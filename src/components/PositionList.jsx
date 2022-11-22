import { observer } from "mobx-react-lite";
import React, {useContext} from "react";
import { Context } from "..";


//container
import PositionItem from "./PositionItem";

//styles
import {CartContainer} from  "../styles/styles"

const ProductList = observer(({addPositionToCart}) => {
    const {positionsStore} = useContext(Context)

    positionsStore.positions.map((position) => 
       console.log(position)          
    );

    return (
        <CartContainer>
            {positionsStore.positions.map((position) => 
                <PositionItem 
                    key={position.id} 
                    position={position}
                    addPositionToCart={addPositionToCart} 
                />
            )}
        </CartContainer>
    )
})

export default ProductList