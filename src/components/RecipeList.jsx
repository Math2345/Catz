import { observer } from "mobx-react-lite";
import React, {useContext} from "react";
import { Context } from "..";


//container
import RecipeItem from "./RecipeItem";

//styles
import {CartContainer} from  "../styles/styles"

const RecipeList = observer(({recipeByClick}) => {
    const {recipesStore} = useContext(Context)

    const stylePanel = {
        'marginTop': '10px',
        'color': '#fff'
    }

    return (
        <CartContainer сolumn={"1fr"}>
            {recipesStore.recipes.length === 0 ? <div style={stylePanel}>Рецептов пока нет!</div>
            :
            recipesStore.recipes.map((recipe) => 
                <RecipeItem 
                    key={recipe.id} 
                    recipe={recipe}
                    recipeByClick={recipeByClick}
                />
            )}
        </CartContainer>
    )
})

export default RecipeList