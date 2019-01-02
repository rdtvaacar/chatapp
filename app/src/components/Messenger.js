import React, {Component} from 'react'
import avatar from '../images/avatar.png'

export default class Messenger extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: window.innerHeight,
            messages: [],
        }
        this._onresize = this._onresize.bind(this)
        this.addtestMessages = this.addtestMessages.bind(this)
    }

    _onresize() {
        this.setState({
            height: window.innerHeight
        })
    }

    addtestMessages() {
        let {messages} = this.state
        for (let i = 0; i < 100; i++) {
            let isMe = false
            if (i % 2 === 0) {
                isMe = 'me'
            } else {
                isMe = ''
            }
            const newMsg = {
                author: `Kullanıcı ${i}`,
                body: `Kullanıcı ${i}`,
                avatar: avatar,
                me: isMe
            }
            messages.push(newMsg)
        }
        this.setState({
            messages: messages
        })
    }

    componentDidMount() {
        window.addEventListener('resize', this._onresize)
        this.addtestMessages()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._onresize)

    }

    render() {
        const {height, messages} = this.state
        const style = {
            height: height
        }
        return <div style={style} className={'app-messenger'}>
            <div className={'header'}>
                <div className={'left'}>
                    <div className={'action'}>
                        <button>Yeni Mesaj</button>
                    </div>
                </div>
                <div className={'content'}><h2>Başlık</h2></div>
                <div className={'right'}>
                    <div className={'user-bar'}>
                        <div className={'profile-name'}>Aydın ACAR</div>
                        <div className={'profile-image'}>
                            <img src={avatar} alt={'Avatar'}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'main'}>
                <div className={'sidebar-left'}>
                    <div className={'channels'}>
                        <div className={'channel'}>
                            <div className={'user-image'}>
                               <img  src={avatar} />
                            </div>
                            <div className={'chanel-info'}>
                                <h2>Kanal 1</h2>
                                <p>Kanalıma hoşgeldiniz</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'content'}>
                    <div className={'content-messages'}>
                        {messages.map((message, index) => {
                            console.log(message)
                            let messageClass = '';
                            if (message.me == '') {
                                messageClass = 'message'
                            } else {
                                messageClass = 'message me'
                            }
                            return (
                                <div key={index} className={'messages'}>
                                    <div className={messageClass}>
                                        <div className={'message-user-image'}>
                                            <img src={message.avatar} alt="Avatar"/>
                                        </div>
                                        <div className={'message-body'}>
                                            <div className={'message-author'}>{message.me == '' ? message.author + ' Yazdı' : 'Sen Yazdın'}</div>
                                            <div className={'message-text'}>
                                                <p>{message.body}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={'messenger-input'}>
                        <div className={'text-input'}>
                            <textarea placeholder={'Birşeyler yaz'}/>
                        </div>
                        <div className={'actions'}>
                            <button className={'send'}>GÖNDER</button>
                        </div>
                    </div>
                </div>

                <div className={'sidebar-right'}>
                    <div className={'members'}>
                        <div className={'member'}>
                            <div className={'user-image'}>
                                <img  src={avatar} />
                            </div>
                            <div className={'member-info'}>
                                <h2>Aydın ACAR</h2>
                                <p>Katıldı : 3 gün önce</p>
                            </div>
                        </div>
                    </div>
                    <div className={'members'}>
                        <div className={'member'}>
                            <div className={'user-image'}>
                                <img  src={avatar} />
                            </div>
                            <div className={'member-info'}>
                                <h2>Aydın ACAR</h2>
                                <p>Katıldı : 3 gün önce</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

}