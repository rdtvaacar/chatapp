import React, {Component} from 'react'
import Messenger from './Messenger'
import Store from '../Store'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            store: new Store()
        }
    }

    render() {
        const {store} = this.state
        return <div className={'app-wraper'}>
            merhaba dünya
            <Messenger store={store}/>
        </div>
    }
}