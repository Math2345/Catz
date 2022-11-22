import { observer } from "mobx-react-lite";
import React, {useContext} from "react";
import { Context } from "..";


//container
import ProductItem from "./ProductItem";

//styles
import {CartContainer} from  "../styles/styles"

const ProductList = observer(({productByClick}) => {
    const {productsStore} = useContext(Context)

    return (
        <CartContainer>
            {productsStore.products.map((product) => 
                <ProductItem 
                    key={product.id} 
                    product={product}
                    productByClick={productByClick} 
                />
            )}
        </CartContainer>
    )
})

export default ProductList