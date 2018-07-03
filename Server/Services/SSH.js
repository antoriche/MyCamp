import node_ssh from 'node-ssh';
import config from '../config';
import path from 'path';

const ssh = new node_ssh();

const waitToBeConnected = ssh.connect(Object.assign(config.ssh, { privateKey : path.join(dirname__, '..' ,config.ssh.privateKey) }))
                            .catch((err) => {console.error(err); process.exit(1);});

const execute = (command, params) => {
  return waitToBeConnected.then(_ => {
    ssh.exec(command, params, { /*cwd: '/var/www',*/ stream: 'stdout', options: { pty: true } }).then((result) => {
      console.log(result)
    })
  });
}

export const setupProject = (project) => execute("setupProject", [project.user.email, project.name, project.url, project.git, project.env] );

export const removeProject = (project) => execute("removeProject", [project.user.email, project.name, project.url, project.git, project.env] );

export const registerUser = (email, password) => execute("registerUser", [email, password]);