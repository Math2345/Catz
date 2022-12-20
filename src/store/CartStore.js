import { makeAutoObservable } from "mobx"


export default class CartStore {
    constructor() {
        this._positionsInCart = []
        this._totalPrice = 0;
        this._totalCount = 0;
        makeAutoObservable(this)
    }

    addPositionInCart(elems) {
        this._positionsInCart = elems
    }

    positionsInCart() {
        return this._positionsInCart
    }

    setTotalPrice(price) {
        this._totalPrice = price
    }

    getTotalPrice() {
        return this._totalPrice
    }

    getTotalCount() {
        return this._totalCount
    }

    setTotalCount(count) {
        this._totalCount = count
    }
}