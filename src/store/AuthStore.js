import {makeAutoObservable} from "mobx"


export default class AuthStore {
    constructor() {
        this._Auth = false
        this._user = {}
        makeAutoObservable(this, {}, {deep: true})
    }

    setIsAuth(bool) {
        this._Auth = bool
    }

    setUser(user) {
        this._user = user;
    }

    get isAuth() {
        return this._Auth
    }

    get AuthUser() {
        return this._user
    }
    
    сheckUser(user_log) {
        return this._user['email'] === user_log
    }
}