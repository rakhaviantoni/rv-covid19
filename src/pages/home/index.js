import React from 'react';
import io from "socket.io-client";
import { withRouter } from 'react-router-dom'
import { Toast } from 'antd-mobile';
import { SOCKET_URL } from '../../config';
import { getCookie } from '../../utils/cookies';
import { VideoApi, BACK_TO_LOGIN } from '../../api';
import { socket, VideoSocket } from '../../socket';
import { datetimeToLocal } from '../../utils/formatter/datetime';
import { Icon } from '@iconify/react';
import signOut from '@iconify/icons-fa/sign-out';
import like from '@iconify/icons-ant-design/like-filled';
import dislike from '@iconify/icons-ant-design/dislike-filled';
import close from '@iconify/icons-ant-design/close-circle-outlined';

class Home extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      list: [],
      form: {
        comment: ''
      },
      isLoading: true,
      visiblePopup: false,
      options: {
          // path: '/video',
          // extraHeaders: {
          //   Authorization: getCookie('_BagidataToken')
          // },
          transport : ['polling', 'websocket'],
          transportOptions: {
            polling: {
              extraHeaders: {
                Authorization: getCookie('_BagidataToken')
              }
            }
          },
          rejectUnauthorized: false
      }
    };
  }
  

  componentDidMount() {
    this.init();
  }
  
  init = () => {
    Toast.hide()
    socket.on('connect', () => {
      console.log(socket.id)
    })
    this.fetchVideoList()
  }

  fetchVideoList = () => {
    Toast.loading('Loading...', 1000, null, true)
    socket.emit('getListData', message => {
      console.log(message)
    })
    VideoApi.list()
    .then(response => {
      if(response.data.status === 200){
        let { data, list } = this.state
        list = response.data.data
        data = list[1]
        this.setState({ data, list })
      }
      Toast.hide()
    }).catch(err => {
      Toast.hide()
      Toast.fail(err.response?err.response.data.message:JSON.stringify(err.message), 3, null, false)
    })

  }

  onChange = (e, fname) => {
    let { form } = this.state
    form[fname] = e.target.value
    this.setState({ form })
  }

  handleSubmit = (e, id) => {
    e.preventDefault()
    this.setState({ loading: true })
    Toast.loading('Loading...', 1000, null, true)
    let { form, options } = this.state
    let params = { id_video: id, comment: form.comment }
    const socket = io(SOCKET_URL, params, options)
    socket.emit('commentVideo', params, message => {
      console.log(message)
    })
    // VideoApi.comment(params)
    // .then(response => {
    //   console.log(response)
    //   if(response.data.status === 200){
    //     Toast.hide()
    //     Toast.success('Account has been created', 3, null, true)
    //   }
    // }).catch(err => {
    //   Toast.hide()
    //   Toast.fail(err.response?err.response.data.message:JSON.stringify(err.message), 3, null, true)
    // })
  }

  render() {

    let { data, list, form, visiblePopup } = this.state
    
    const handleLikeVideo = id => {
      let { options } = this.state
      let params = { id_video: id}
      const socket = io(SOCKET_URL, params, options)
      // VideoSocket.like(params, message => {
      //   console.log(message)
      // })
      socket.emit('likeVideo', params, message => {
        console.log(message)
      })
      // this.fetchVideoList()
    }
    const handleDislikeVideo = id => {
      let { options } = this.state
      let params = { id_video: id}
      const socket = io(SOCKET_URL, params, options)
      // VideoSocket.dislike(params, message => {
      //   console.log(message)
      // })
      socket.emit('dislikeVideo', params, message => {
        console.log(message)
      })
      // this.fetchVideoList()
    }
    const handleTogglePopup = (value, data) => {
      this.setState({ visiblePopup: value, data })
    }
    const handleSignout = e => {
      BACK_TO_LOGIN(true)
    }
    
    const Video = ({ youtubeId }) => {
      youtubeId = youtubeId.split('/').slice(-1)[0].includes('=') ? youtubeId.split('/').slice(-1)[0].split('=').slice(-1)[0] : youtubeId.split('/').slice(-1)[0]
      return (
        <div
          className="video"
          style={{
            position: "relative",
            paddingBottom: "56.25%" /* 16:9 */,
            paddingTop: 25,
            height: 0
          }}
        >
          <iframe
            title={youtubeId}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%"
            }}
            src={`https://www.youtube.com/embed/${youtubeId}`}
            frameBorder="0"
          />
        </div>
      );
    }

    return (
      <React.Fragment>
        <section className="section-home">
          <div className="header" style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 30 }}>
            <div  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div className="title">
                Bagidata Video List
              </div>
              <div className="profile" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button className="btn-menu" onClick={ handleSignout } style={{ paddingRight: 0, marginLeft: 5 }}>
                  <Icon icon={signOut} color="white" />
                </button>
              </div>
            </div>
            <div style={{ marginTop: 30, marginBottom: 0, textAlign: 'center', color: 'white' }}>
              <small style={{ fontSize: 14 }}>Mempertemukan kebutuhan pemilik data
              dengan para pengguna data</small>
            </div>
          </div>
          { 
            list.slice(0).reverse().map((item, key) => 
              <div className="body" key={ key }>
                <Video youtubeId={item.media_url} />
                <div className="title">
                  { item.title }
                </div>
                <div className="desc">
                  {item.description}
                </div>
                <div className="info">
                  <button title="I like this" onClick={ e => handleLikeVideo(item.id) }><Icon icon={like} color="white" width="25" height="25" />&nbsp;&nbsp;{item.likers}</button>
                  <button title="I dislike this" onClick={ e => handleDislikeVideo(item.id) }><Icon icon={dislike} color="white" width="25" height="25" />&nbsp;&nbsp;{item.dislikers}</button>
                </div>
                <button className="btn-next" onClick={ e => handleTogglePopup(true, item) }>
                  See Comments
                </button>
              </div>
            )
          }
        </section>

        <div className={ visiblePopup ? "popup active" : "popup" } >
          {/* <div className="overlay">
            { visiblePopup && 
              <Video youtubeId={data.media_url?data.media_url:''} />
            }
          </div> */}
          <div className="content">
            { visiblePopup && 
            <button className="btn-close" onClick={ e => handleTogglePopup(false, {}) }>
              <Icon icon={close} color="white" width="30" height="30" />
            </button>
            }
            { visiblePopup && 
              <Video youtubeId={data.media_url?data.media_url:''} />
            }
            <div className="title">{data.title}</div>
            <div className="scroll">
            {
              (data.comments && data.comments.length > 0) ?
              data.comments.slice(0).reverse().map((item, key) => 
                <div className="comment" key={ key }>
                  <div className="comment header">
                    <span className="author">{item.username}
                    </span>
                    <span className="at">
                    { datetimeToLocal(item.created_date) }
                    </span>
                  </div>
                  <div className="comment text">
                    {item.comment}
                  </div>
                </div>
              ) : 
              'No Comments'
            }
            </div>
            <form onSubmit={ e => this.handleSubmit(e, data.id) }>
              <input type="text" className="input-comment" placeholder="Add a comment..." onChange={ e => this.onChange(e, 'comment') } value={ form.comment } />
              <button type="submit" className="button-comment" disabled={ form.comment === '' }>Comment</button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Home);