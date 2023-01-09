import { observer } from "mobx-react-lite";
import React, { useState, useContext, useEffect } from "react";
import { Context } from "..";
import { useNavigate } from 'react-router-dom'

import { Formik } from 'formik'

//http
import { findAllProducts, push, save } from "../http/ProductApi";

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
import {validationsSchemaProduct, UNAUTHORIZED_ROUTE } from "../utils/consts";


const DeliverPage = observer(() => {
    const navigate = useNavigate()
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

    const addProductCountByClick = async(e) => {
        const elem = e.currentTarget;
        const id = elem.getAttribute('id');

        await push(id, 100)


        const products = await findAllProducts()

        productsStore.setProducts(products)
    }

    const logoout = () => {
        sessionStorage.setItem('id', '')
        sessionStorage.setItem('login', '')
        sessionStorage.setItem('role', '')

        navigate(UNAUTHORIZED_ROUTE)
    }

    return (
        <>
            <HeaderWr>
                <LogoWr><Image src={LogoImg} alt="logo" /></LogoWr>
                <SubTitle>Продукция</SubTitle>
                <Button padding={"10px"} color={"#337EAA"} onClick={() => setModalActive(true)}>Добавить продукцию</Button>
                <div style={{'marginLeft': '20px'}}>
                    <Button
                                    padding={"5px 10px"}
                                    color={"#000"}
                                    onClick={logoout}
                        >           Выйти из аккаунта
                    </Button>
                </div>
            </HeaderWr>
            <ProductList addProductCountByClick={addProductCountByClick} />
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