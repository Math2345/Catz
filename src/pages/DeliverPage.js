import { observer } from "mobx-react-lite";
import React, {useState, useContext} from "react";
import { Context } from "..";

//http
import { findAllProducts, save } from "../http/ProductApi";    


// modal
import Modal from "../components/Modal/Modal";

// container
import ProductList from "../components/ProductList";

// ui
import SubTitle from "../components/UI/Subtitle";
import Image from "../components/UI/Image";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";


// logo
import LogoImg from "../static/image/logo.svg";

import {
    HeaderWr,
    LogoWr,
    StyledModal,
    StyledModalContent,
    StyledModalTitle,
    StyledLabelText

} 
from "../styles/styles"
import { useEffect } from "react";


const DeliverPage = observer(() => {
    const {productsStore} = useContext(Context)

    const [modalActive, setModalActive] = useState(false)
    const [productTitle, setProductTitle] = useState('')
    const [productImage, setProductImage] = useState('')
    const [productCount, setProductCount] = useState(0)

    useEffect(() => {
        findAllProducts().then(data => productsStore.setProducts(data));
    }, [])


    const saveProductByClick = async () => {
        await save(productTitle, productImage, productCount)

        const products = await findAllProducts()

        productsStore.setProducts(products)

        setProductTitle('')
        setProductImage('')
        setProductCount('')
    }

    const removeProductByClick = (e) => {
        const elem = e.currentTarget.parentNode;
        const id = elem.getAttribute('id');

        const filterProducts = productsStore.products.filter(el => {
            return el.id !== +id
        })

        productsStore.setProducts(filterProducts)
    }
     
    return (
        <>
            <HeaderWr>
                <LogoWr><Image src={LogoImg} alt="logo" /></LogoWr>
                <SubTitle>Продукция</SubTitle>
                <Button padding={"10px"} color={"#337EAA"} onClick={() => setModalActive(true)}>Добавить продукцию</Button>
            </HeaderWr>
            <ProductList removeProductByClick={removeProductByClick}/>
            <Modal>
                <StyledModal active={modalActive} onClick={() => setModalActive(false)}>
                    <StyledModalContent onClick={(e) => e.stopPropagation()}>
                        <StyledModalTitle>Новый продукт</StyledModalTitle>
                        <StyledLabelText>Наименование продукта:</StyledLabelText>
                        <Input bg={"#fff"}
                            color={"#000"}
                            size={"13px"}
                            padding={"10px 20px"}
                            margin={"10px"}
                            type="text" 
                            value={productTitle}
                            onChange={e => setProductTitle(e.target.value)}    
                            />
                        <StyledLabelText>Изображение продукта:</StyledLabelText>
                        <Input bg={"#fff"}
                            color={"#000"}
                            size={"13px"}
                            padding={"10px 20px"}
                            margin={"10px"}
                            type="text"
                            value={productImage}
                            onChange={e => setProductImage(e.target.value)}        
                            />
                        <StyledLabelText>Количество:</StyledLabelText>
                        <Input bg={"#fff"}
                            color={"#000"}
                            size={"13px"}
                            padding={"10px 20px"}
                            margin={"10px"}
                            type="text"
                            value={productCount}
                            onChange={e => setProductCount(e.target.value)}        
                            />
                        <div onClick={() => setModalActive(false)}>
                            <Button
                                onClick={saveProductByClick}
                                padding={"5px 10px"}
                                color={"#008C95"}>
                                Добавить
                            </Button>
                        </div>
                    </StyledModalContent>
                </StyledModal>
            </Modal>  
            
        </>
    )
})


export default DeliverPage;