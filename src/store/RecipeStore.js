import {makeAutoObservable} from "mobx"


export default class RecipeStore {
    constructor() {
        this._recipes = []
        this._selectedRecipe = {}

        makeAutoObservable(this)
    }

    setRecipes(recipes) {
        this._recipes = recipes
    }

    get recipes() {
        return this._recipes
    }

    
    setSelectedRecipe(selectedId) {
        this._selectedRecipe = selectedId
    }

    
    get selectedRecipe() {
        return this._selectedRecipe
    }
}