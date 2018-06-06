import axios from 'axios';

const port = 8080;

const request = axios.create({
  baseURL: 'http://'+window.location.hostname+':'+port+'/api'
});

const token = token_ => {
  if(token_ === undefined){
    return sessionStorage.token === 'null' ? null : sessionStorage.token;
  }
  sessionStorage.token = typeof(token_) === 'string' ? token_ : null;
}

export const isAuth = () => { console.log(token() != null); return token() != null; };

const authListeners = [];
export const onAuth = (callback) => {
  authListeners.push(callback);
  return () => {
    authListeners.splice(authListeners.indexOf(callback), 1);
  };
};

export const ping = () => (
  request.get('/ping', {})
);

export const login = (email, password) => (
  request.get('/login', { params : { email, password } })
  .then(resp => {
    const { data } = resp;
    if(data.auth) token(data.token);
    authListeners.forEach(fn => fn());
    return data;
  })
);

export const logout = () => (
  new Promise((resolve, reject) => {
    token(null);
    authListeners.forEach(fn => fn());
    resolve();
  })
);