
// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'ws://localhost:4000';

export const socket = new WebSocket("ws://localhost:4000")
// export const socket = io(URL || "",{
//   autoConnect: false
// });