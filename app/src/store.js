import {OrderMap} from 'immutable'

export default class store {
    constructor() {

        this.messages = new OrderMap()
    }
}