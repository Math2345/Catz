import {makeAutoObservable} from "mobx"


export default class UserStore {
    constructor() {
        this._users = []
        makeAutoObservable(this)
    }

    addUsers(user) {
        this._users = user
    }

    get users() {
        return this._users;
    }

    userById(id) {
        return this._users[id]
    }
}