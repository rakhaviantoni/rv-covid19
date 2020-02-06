import io from "socket.io-client";

export default ({ url, options, defaultParams }) => {
//   const endpoint = `${url}video`
  const socket = io.connect(url, options)
  return {
    list: (cb) => socket.on('getListData', message => {
        console.log(message)
        cb(message)
    }),
    like: (params, cb) => socket.emit('likeVideo', params, message => {
        console.log(message)
        cb(message)
    }),
    dislike: (params, cb) => socket.emit('dislikeVideo', params, message => {
        console.log(message)
        cb(message)
    }),
  }
}