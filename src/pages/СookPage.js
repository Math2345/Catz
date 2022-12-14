import { observer } from "mobx-react-lite";
import React, { useState, useContext, useEffect} from "react";
import { Context } from "..";

import { Formik, Field } from 'formik'
import { useNavigate } from 'react-router-dom'

//http
import { findAllProducts, push } from "../http/ProductApi";
import { saveRecipe, findAll } from "../http/RecipeApi";
import { savePosition } from "../http/PositionApi";

// modal
import Modal from "../components/Modal/Modal";

// ui
import Title from "../components/UI/Title";
import SelectMultuple from "../components/UI/SelectMultuple";
import SubTitle from "../components/UI/Subtitle";
import Image from "../components/UI/Image";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";


// logo
import LogoImg from "../static/image/logo.svg"

import "../styles/custom.css"

import {
    HeaderWr,
    LogoWr,
    StyledModal,
    StyledModalContent,
    StyledModalTitle,
    StyledLabelText,
    StyledError
}
    from "../styles/styles"

// container
import ProductList from "../components/ProductList";
import RecipeList from "../components/RecipeList";

import { validationsSchemaRecipe, validationsSchemaPosition,  UNAUTHORIZED_ROUTE  } from "../utils/consts";


const CookPage = observer(() => {
    const navigate = useNavigate()
    const { productsStore } = useContext(Context)
    const { recipesStore } = useContext(Context)

    const [modalActiveProduct, setModalActiveProduct] = useState(false)
    const [modalActivePosition, setModalActivePosition] = useState(false)

    //products 
    const [products, setProducts] = useState([])

    //recipes
    const [recipes, setRecipes] = useState([])

    // recipes
    const [recipeTitle, setRecipeTitle] = useState('')
    const [recipeDescription, setRecipeDescription] = useState('')

    //position
    const [positionTitle, setPositionTitle] = useState('')
    const [positionDescription, setPositionDescription] = useState('')
    const [positionImage, setPositionImage] = useState('')
    const [positionPrice, setPositionPrice] = useState(0)

    useEffect(() => {
        findAllProducts().then(data => productsStore.setProducts(data));
        findAll().then(data => recipesStore.setRecipes(data));
    }, [])


    // ???????????????? ???????????? ????????????????
    const getListProducts = () => {
        const _products = productsStore.products.map((product) => {
            return { id: product.id, value: product.name, label: product.name,  count: product.count }
        })

        setProducts(_products)
    }

    const getListRecipes = () => {
        const _recipes = recipesStore.recipes.map((recipe) => {
            return { id: recipe.id, value: recipe.title, label: recipe.title}
        })

        setRecipes(_recipes)
    }



    // co?????????? ????????????
    const addRecipeByClick = async (values) => {
        const prsData = []

        for (let i = 0; i < values.goods.length; i++) {
            for (let j = 0; j < products.length; j++) {
                if (products[j].value === values.goods[i]) prsData.push({ "productId": products[j].id, "count": 5 })
            }
        }

        const newRecepe = {
            'title': values.title,
            'description': values.description,
            'products': prsData
        }


        await saveRecipe(newRecepe)

        const recipes = await findAll()
        recipesStore.setRecipes(recipes)

        // ???????????????????? ???????????? ???????????????????? 
        //const products = await findAllProducts()
        //productsStore.setProducts(products)

        setRecipeTitle('')
        setRecipeDescription('')
        setModalActiveProduct(false)

        console.log(products)
    }

    //co?????????? ??????????
    const addPositionByClick = async (values) => {
    
        const recipeId = recipes.find( recipe => recipe.value === values.recipe).id

        const newPosition = {
            'title': values.title,
            'description': values.description,
            'photo': values.photo,
            'price' : +values.price,
            'recipeId': +recipeId
        }

        await savePosition(newPosition)

        setModalActivePosition(false)

        setPositionTitle('')
        setPositionDescription('')
        setPositionImage('')
        setPositionPrice(0)
    }

    const logoout = () => {
        sessionStorage.setItem('id', '')
        sessionStorage.setItem('login', '')
        sessionStorage.setItem('role', '')

        navigate(UNAUTHORIZED_ROUTE)
    }

    return (
        <>
            <Title>?????????????? ????????????</Title>
            <HeaderWr>
                <LogoWr><Image src={LogoImg} alt="logo" /></LogoWr>
                <div style={{'marginRight': 'auto'}}>
                    <SubTitle>C?????????? ??????????????????</SubTitle>
                </div>
            </HeaderWr>
            <div onClick={() => setModalActiveProduct(true)} style={{'display': 'flex', 'justifyContent': 'space-between'}}>
                    <Button
                        w={"0px"}
                        padding={"10px"}
                        color={"#337EAA"}
                        onClick={getListProducts}
                    >
                        C???????????? ????????????
                    </Button>
                    <Button
                                    padding={"5px 10px"}
                                    color={"#000"}
                                    onClick={logoout}
                        >           ?????????? ???? ????????????????
                    </Button>
                </div>
            <ProductList />
            <HeaderWr>
                <SubTitle>C?????????? ????????????????</SubTitle>
                <div onClick={() => setModalActivePosition(true)}>
                    <Button 
                        padding={"10px"} 
                        color={"#337EAA"} 
                        onClick={getListRecipes}
                    >
                        ?????????????? ?????????? ???? ??????????????
                    </Button>
                </div>
            </HeaderWr>
            <RecipeList />
            <Modal>
                <StyledModal active={modalActiveProduct} onClick={() => setModalActiveProduct(false)}>
                    <StyledModalContent onClick={(e) => e.stopPropagation()}>
                        <StyledModalTitle>?????????? ????????????:</StyledModalTitle>
                        <StyledLabelText>???????????????????????? ??????????????:</StyledLabelText>
                        <Formik
                            initialValues={{
                                title: '',
                                description: '',
                                goods: []
                            }}
                            onSubmit={(values) => addRecipeByClick(values)}
                            validationSchema={validationsSchemaRecipe}
                        >
                            {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
                                <div>
                                    <Input bg={"#fff"}
                                        color={"#000"}
                                        size={"13px"}
                                        padding={"10px 20px"}
                                        margin={"10px"}
                                        type="text"
                                        name={`title`}
                                        value={values.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.title && errors.title && <StyledError>{errors.title}</StyledError>}
                                    <StyledLabelText>???????????????? ??????????????:</StyledLabelText>
                                    <Input bg={"#fff"}
                                        color={"#000"}
                                        size={"13px"}
                                        padding={"10px 20px"}
                                        margin={"10px"}
                                        type="text"
                                        name={`description`}
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.description && errors.description && <StyledError>{errors.description}</StyledError>}
                                    <StyledLabelText>??????????????????:</StyledLabelText>
                                    <Field
                                        name={`goods`}
                                        placeholder="???????????????? ???????????? ??????????????????"
                                        isMulti={true}
                                        component={SelectMultuple}
                                        options={products}
                                    />
                                    <div>
                                        <Button
                                            disabled={!isValid && !dirty}
                                            padding={"5px 10px"}
                                            color={"#008C95"}
                                            onClick={handleSubmit}
                                            type={`submit`}
                                        >
                                            ????????????????
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </Formik>

                    </StyledModalContent>
                </StyledModal>
            </Modal>
            <Modal>
                <StyledModal active={modalActivePosition} onClick={() => setModalActivePosition(false)}>
                    <StyledModalContent onClick={(e) => e.stopPropagation()}>
                        <StyledModalTitle>?????????? ??????????:</StyledModalTitle>
                        <StyledLabelText>???????????????????????? ??????????:</StyledLabelText>
                        <Formik
                            initialValues={{
                                title: '',
                                description: '',
                                photo: '',
                                price: 0,
                                recipe: ''
                            }}
                            onSubmit={(values) => addPositionByClick(values)}
                            validationSchema={validationsSchemaPosition}
                        >
                            {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
                                <div>
                                    <Input bg={"#fff"}
                                        color={"#000"}
                                        size={"13px"}
                                        padding={"10px 20px"}
                                        margin={"10px"}
                                        type="text"
                                        name={`title`}
                                        value={values.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                     {touched.title && errors.title && <StyledError>{errors.title}</StyledError>}
                                    <StyledLabelText>???????????????? ??????????:</StyledLabelText>
                                    <Input bg={"#fff"}
                                        color={"#000"}
                                        size={"13px"}
                                        padding={"10px 20px"}
                                        margin={"10px"}
                                        type="text"
                                        name={`description`}
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.description && errors.description && <StyledError>{errors.description}</StyledError>}
                                    <StyledLabelText>?????????????????????? ??????????:</StyledLabelText>
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
                                    <StyledLabelText>????????:</StyledLabelText>
                                    <Input bg={"#fff"}
                                        color={"#000"}
                                        size={"13px"}
                                        padding={"10px 20px"}
                                        margin={"10px"}
                                        type="text"
                                        name={`price`}
                                        value={values.price}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.price && errors.price && <StyledError>{errors.price}</StyledError>}
                                    <StyledLabelText>??????????????:</StyledLabelText>
                                    <Field
                                        name={`recipe`}
                                        placeholder="???????????????? ???????????? ????????????????"
                                        isMulti={false}
                                        component={SelectMultuple}
                                        options={recipes}
                                    />
                                    <div></div>
                                    <Button
                                        disabled={!isValid && !dirty}
                                        padding={"5px 10px"}
                                        color={"#008C95"}
                                        onClick={handleSubmit}
                                        type={`submit`}
                                    >
                                        ????????????????
                                    </Button>
                                </div>
                            )}
                        </Formik>
                    </StyledModalContent>
                </StyledModal>
            </Modal>
        </>
    )
})


export default CookPage;