import { observer } from "mobx-react-lite";
import React, {useContext} from "react";
import { Context } from "..";


//container
import ProductItem from "./ProductItem";

//styles
import {CartContainer} from  "../styles/styles"

const ProductList = observer(({addProductCountByClick}) => {
    const {productsStore} = useContext(Context)

    const stylePanel = {
        'marginTop': '10px',
        'color': '#fff'
    }

    return (
        <CartContainer>
            {productsStore.products.length === 0 ? <div style={stylePanel}>Продуктов пока нет!</div>
            :
            productsStore.products.map((product) => 
                <ProductItem 
                    key={product.id}
                    product={product}
                    addProductCountByClick={addProductCountByClick} 
                />
            )}
        </CartContainer>
    )
})

export default ProductList