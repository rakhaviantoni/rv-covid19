import io from "socket.io-client";
import { SOCKET_URL } from '../config';
import { getCookie } from '../utils/cookies';
import Video from './video';

let options = {
    transport : ['polling', 'websocket'],
    transportOptions: {
        polling: {
            extraHeaders: {
                'Authorization': getCookie('_BagidataToken')
            }
        }
    },
    rejectUnauthorized: false
}

export const socket = io(SOCKET_URL, options)

// export const socket = io(SOCKET_URL, options);
const params = { url: SOCKET_URL, options }
export const VideoSocket = Video(params)