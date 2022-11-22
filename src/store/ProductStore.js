import {makeAutoObservable} from "mobx"


export default class ProductStore {
    constructor() {
        this._products = []
        this._selectedProducts = []

        makeAutoObservable(this)
    }

    setProducts(products) {
        this._products = products
    }

    get products() {
        return this._products
    }

    setSelectedProducts(selectedProduct) {
        this._selectedProducts.push(selectedProduct)
    }

    
    get selectedProducts() {
        return this._selectedProducts
    }

}