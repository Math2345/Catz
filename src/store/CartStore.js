import {makeAutoObservable} from "mobx"


export default class CartStore {
    constructor() {
        this._items = []
        this._totalPrice = 0;
        this._totalCount = 0;
        makeAutoObservable(this)
    }

    addProductInCart(id) {

    }


    removeProductFromCart() {

    }


    plusCartItem() {

    }


    minusCartItem() {

    }


    _updateData() {

    }

    clearCart() {

    }
}