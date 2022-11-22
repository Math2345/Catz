import { observer } from "mobx-react-lite";
import React from "react";


//ui
import Image from "./UI/Image";
import {
            Card,
            CardTitle,
            CardDescription
        } from "../styles/styles"


const RecipeItem = observer(({recipe, recipeByClick}) => {
    const id = recipe.id;

    return (
        <Card per={'100%'} id={id} onClick={recipeByClick}>
            <CardTitle>{recipe.title}</CardTitle>
            <CardDescription>{recipe.description}</CardDescription>
        </Card>
    )
})

export default RecipeItem