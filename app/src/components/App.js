import React, {Component} from 'react'
import Messenger from './Messenger'

export default class App extends Component {
    render() {
        return <div className={'app-wraper'}>
            merhaba dünya
            <Messenger/>
        </div>
    }
}