import {makeAutoObservable} from "mobx"


export default class OrderStore {
    constructor() {
        this._orders = []
        makeAutoObservable(this)
    }


    addOrders(orders) {
        this._orders = orders
    }

    getOrders() {
        return this._orders;
    }
}