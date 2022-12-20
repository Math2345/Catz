import { observer } from "mobx-react-lite";
import React, { useState, useContext, useEffect } from "react";
import { Context } from "..";

import { Formik } from 'formik'

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
    StyledLabelText,
    StyledError

}  from "../styles/styles"

// const 
import {validationsSchemaProduct } from "../utils/consts";


const DeliverPage = observer(() => {
    const { productsStore } = useContext(Context)

    const [modalActive, setModalActive] = useState(false)
    const [productTitle, setProductTitle] = useState('')
    const [productImage, setProductImage] = useState('')
    const [productCount, setProductCount] = useState(0)


    useEffect(() => {
        findAllProducts().then(data => productsStore.setProducts(data));
    }, [])


    const saveProductByClick = async (values) => {
        await save(values)

        const products = await findAllProducts()
        productsStore.setProducts(products)

        setProductTitle('')
        setProductImage('')
        setProductCount('')

        setModalActive(false)
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
            <ProductList removeProductByClick={removeProductByClick} />
            <Modal>
                <StyledModal active={modalActive} onClick={() => setModalActive(false)}>
                    <StyledModalContent onClick={(e) => e.stopPropagation()}>
                        <StyledModalTitle>Новый продукт</StyledModalTitle>
                        <StyledLabelText>Наименование продукта:</StyledLabelText>
                        <Formik
                            initialValues={{
                                name: '',
                                photo: '',
                                count: ''
                            }}
                            onSubmit={(values) => saveProductByClick(values)}
                            validationSchema={validationsSchemaProduct}
                        >
                            {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                                <div>
                                    <Input bg={"#fff"}
                                        color={"#000"}
                                        size={"13px"}
                                        padding={"10px 20px"}
                                        margin={"10px"}
                                        type="text"
                                        name={`name`}
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.name && errors.name && <StyledError>{errors.name}</StyledError>}
                                    <StyledLabelText>Изображение продукта:</StyledLabelText>
                                    <Input bg={"#fff"}
                                        color={"#000"}
                                        size={"13px"}
                                        padding={"10px 20px"}
                                        margin={"10px"}
                                        type="text"
                                        name={`photo`}
                                        value={values.photo}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.photo && errors.photo && <StyledError>{errors.photo}</StyledError>}
                                    <StyledLabelText>Количество:</StyledLabelText>
                                    <Input bg={"#fff"}
                                        color={"#000"}
                                        size={"13px"}
                                        padding={"10px 20px"}
                                        margin={"10px"}
                                        type="text"
                                        name={`count`}
                                        value={values.count}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.count && errors.count && <StyledError>{errors.count}</StyledError>}
                                    <div>
                                        <Button
                                            disabled={!isValid && !dirty}
                                            onClick={handleSubmit}
                                            padding={"5px 10px"}
                                            color={"#008C95"}
                                            type={`submit`}
                                        >
                                            Добавить
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </Formik>
                    </StyledModalContent>
                </StyledModal>
            </Modal>

        </>
    )
})


export default DeliverPage;