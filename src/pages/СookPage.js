import { observer } from "mobx-react-lite";
import React, {useState, useContext, useEffect, useRef} from "react";
import { Context } from "..";

//http
import { findAllProducts } from "../http/ProductApi"; 
import { saveRecipe, findAll} from "../http/RecipeApi";
import { savePosition } from "../http/PositionApi";

// modal
import Modal from "../components/Modal/Modal";

// ui
import SubTitle from "../components/UI/Subtitle";
import Image from "../components/UI/Image";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";


// logo
import LogoImg from "../static/image/logo.svg"

import {
    HeaderWr,
    LogoWr,
    StyledModal,
    StyledModalContent,
    StyledModalTitle,
    StyledLabelText,
    Div
} 
from "../styles/styles"

// container
import ProductList from "../components/ProductList";
import RecipeList from "../components/RecipeList";

import Title from "../components/UI/Title";
import { set } from "mobx";

const CookPage = observer(() => {
    const {productsStore} = useContext(Context)
    const {recipesStore} = useContext(Context)
    const {positionsStore} = useContext(Context)

    const [modalActiveProduct, setModalActiveProduct] = useState(false)
    const [modalActivePosition, setModalActivePosition] = useState(false)

    // recipes
    const [recipeTitle, setRecipeTitle] = useState('')
    const [recipeDescription, setRecipeDescription] = useState('')
    const [selectedProducts, setSelectedProducts] = useState([])

    //position
    const [positionTitle, setPositionTitle] = useState('')
    const [positionDescription, setPositionDescription] = useState('')
    const [positionImage, setPositionImage] = useState('')
    const [positionPrice, setPositionPrice] = useState(0)

    useEffect(() => {
        findAllProducts().then(data => productsStore.setProducts(data));
        findAll().then(data => recipesStore.setRecipes(data));
    }, [])


    const selectedProductsByClick = (e) => {
        const elem = e.currentTarget;

        const title = elem.children[2].innerText;
        const id = elem.getAttribute('id');
        const count = elem.children[3].children[1].innerText
        
        const selectedProduct = {id, title, count}

        productsStore.setSelectedProducts(selectedProduct)
    }


    const addCountProductsForRecipe = (e) => {
        const productId = e.target.previousElementSibling.value;
        const value = e.target.value;

        //productsStore.setSelectedProducts(newProducts)
    }


    const addSelectedProducts = () => {
        const _selectProducts = productsStore.selectedProducts.map()

        setSelectedProducts([...selectedProducts, { title: '', description: '', number: Date.now() }])
    }


    // coздать рецепт
    const addRecipeByClick = async () => {
        const _products = productsStore.selectedProducts.map(product => {
            return { id: product.id, title: product.title, count: product.count }
        })

        console.log(selectedProducts)

        /*const newProducts = _products.map(product =>
            product.id === productId ?
                { ...product, products: { productId: productId, count: value } }
                : product

        ) */

        //await saveRecipe(recipeTitle, recipeDescription, selectedProducts)
        //const recipes = await findAll()

        //recipesStore.setRecipes(recipes)

        
        setRecipeTitle('')
        setRecipeDescription('')
    }

    // coздать блюдо
    const addPositionByClick = async () => {
        const recipeId = recipesStore.selectedRecipe.id;

        await savePosition(positionTitle, positionDescription, positionImage, +positionPrice, +recipeId, false)

    }

     
    return (
        <>
            <Title>Админка повара</Title>
            <HeaderWr>
                <LogoWr><Image src={LogoImg} alt="logo" /></LogoWr>
                <SubTitle>Cписок продуктов</SubTitle>
                <Button 
                    onClick={() => setModalActiveProduct(true)}
                    padding={"10px"} 
                    color={"#337EAA"}>
                            Cоздать рецепт
                </Button>
            </HeaderWr>
            <ProductList productByClick={selectedProductsByClick} />
            <HeaderWr>
                <SubTitle>Cписок рецептов</SubTitle>
                <Button padding={"10px"} color={"#337EAA"} onClick={() => setModalActivePosition(true)}>Создать блюдо по рецепту</Button>
            </HeaderWr>
            <RecipeList />
            <Modal>
                <StyledModal active={modalActiveProduct} onClick={() => setModalActiveProduct(false)}>
                    <StyledModalContent onClick={(e) => e.stopPropagation()}>
                        <StyledModalTitle>Новый рецепт:</StyledModalTitle>
                        <StyledLabelText>Наименование рецепта:</StyledLabelText>
                        <Input bg={"#fff"}
                            color={"#000"}
                            size={"13px"}
                            padding={"10px 20px"}
                            margin={"10px"}
                            type="text" 
                            value={recipeTitle}
                            onChange={e => setRecipeTitle(e.target.value)}    
                            />
                        <StyledLabelText>Описание рецепта:</StyledLabelText>
                        <Input bg={"#fff"}
                            color={"#000"}
                            size={"13px"}
                            padding={"10px 20px"}
                            margin={"10px"}
                            type="text"
                            value={recipeDescription}
                            onChange={e => setRecipeDescription(e.target.value)}        
                            />
                        <StyledLabelText>ПРОДУКЦИЯ:</StyledLabelText>
                        {productsStore.selectedProducts.map(el =>
                            <Div key={el.id}>
                                <StyledLabelText>{el.title}</StyledLabelText>
                                <Div>
                                    <StyledLabelText>Количество:</StyledLabelText>
                                    <Input type="hidden" value={el.id}/>
                                    <Input 
                                        marginLeft={'30px'}
                                        bg={"#fff"}
                                        color={"#000"}
                                        size={"13px"}
                                        padding={"5px 10px"}
                                        margin={"10px"}
                                        type="text"
                                        pattern="/\D/g"
                                        onChange={e => addCountProductsForRecipe(e)}
                                    />
                                </Div>
                            </Div>
                        )}
                        <div onClick={() => setModalActiveProduct(false)}>
                            <Button
                                padding={"5px 10px"}
                                color={"#008C95"}
                                onClick={addRecipeByClick}
                            >
                                Добавить
                            </Button>
                        </div>
                    </StyledModalContent>
                </StyledModal>
            </Modal>
            <Modal>
                <StyledModal active={modalActivePosition} onClick={() => setModalActivePosition(false)}>
                    <StyledModalContent onClick={(e) => e.stopPropagation()}>
                        <StyledModalTitle>Новое блюдо:</StyledModalTitle>
                        <StyledLabelText>Наименование блюда:</StyledLabelText>
                        <Input bg={"#fff"}
                            color={"#000"}
                            size={"13px"}
                            padding={"10px 20px"}
                            margin={"10px"}
                            type="text" 
                            value={positionTitle}
                            onChange={e => setPositionTitle(e.target.value)}    
                            />
                        <StyledLabelText>Описание блюда:</StyledLabelText>
                        <Input bg={"#fff"}
                            color={"#000"}
                            size={"13px"}
                            padding={"10px 20px"}
                            margin={"10px"}
                            type="text" 
                            value={positionDescription}
                            onChange={e => setPositionDescription(e.target.value)}    
                            />
                        <StyledLabelText>Изображение блюда:</StyledLabelText>
                        <Input bg={"#fff"}
                            color={"#000"}
                            size={"13px"}
                            padding={"10px 20px"}
                            margin={"10px"}
                            type="text"
                            value={positionImage}
                            onChange={e => setPositionImage(e.target.value)}        
                            />
                        <StyledLabelText>Цена:</StyledLabelText>
                        <Input bg={"#fff"}
                            color={"#000"}
                            size={"13px"}
                            padding={"10px 20px"}
                            margin={"10px"}
                            type="text"
                            value={positionPrice}
                            onChange={e => setPositionPrice(e.target.value)}        
                            />
                        <StyledLabelText>Блюдо по рецепту : {recipesStore.selectedRecipe.title}</StyledLabelText>    
                        <div onClick={() => setModalActivePosition(false)}>
                            <Button
                                padding={"5px 10px"}
                                color={"#008C95"}
                                onClick={addPositionByClick}
                            >
                                Добавить
                            </Button>
                        </div>
                    </StyledModalContent>
                </StyledModal>
            </Modal>
        </>
    )
})


export default CookPage;