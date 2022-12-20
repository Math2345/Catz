import { observer } from "mobx-react-lite";
import React, {useContext} from "react";
import { Context } from "..";


//container
import PositionItem from "./PositionItem";

//styles
import {CartContainer} from  "../styles/styles"

const ProductList = observer(({addPositionToCart}) => {
    const {positionsStore} = useContext(Context)

    const stylePanel = {
        'marginTop': '10px',
        'color': '#fff'
    }

    return (
        <CartContainer>
            {positionsStore.positions.length === 0 ? <div style={stylePanel}>Блюд пока нет!</div>
            : positionsStore.positions.map((position) => 
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