import axios from 'axios';

const port = 80;

const request = axios.create({
  baseURL: 'http://'+window.location.hostname+':'+port+'/api',
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
  }
});

const token = token_ => {
  if(token_ === undefined){
    return sessionStorage.token === 'null' ? null : sessionStorage.token;
  }
  sessionStorage.token = typeof(token_) === 'string' ? token_ : null;
}

export const isAuth = () => { return token() != null; };

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

export const getMyProjects = () => (
  request.get('/project/my', { params : { token: token() }}).then(resp => resp.data.projects)
)

export const getProjects = () => (
  request.get('/project').then(resp => resp.data.projects)
)

export const insertProject = (project) => (
  request.post('/project', {}, { params: { token: token(), project }}).then(resp => resp.data.project)
)

export const updateProject = (project) => (
  request.put('/project/'+project.id, {}, { params : { token: token(), project }}).then(resp => resp.data.project)
)

export const deleteProject = (id) => (
  request.delete('/project/'+id, { params : { token: token() }}).then(resp => resp.data.project)
)
