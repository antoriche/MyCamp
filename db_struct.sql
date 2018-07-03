DROP DATABASE IF EXISTS MyCamp;
CREATE DATABASE IF NOT EXISTS MyCamp;
USE MyCamp;

CREATE TABLE users(
   id INT NOT NULL AUTO_INCREMENT,
   email VARCHAR(100) NOT NULL UNIQUE,
   password VARCHAR(100) NOT NULL,
   PRIMARY KEY ( id )
);

CREATE TABLE projects(
   id INT NOT NULL AUTO_INCREMENT,
   user_id INT NOT NULL REFERENCES users(id),
   name VARCHAR(100) NOT NULL UNIQUE,
   description VARCHAR(200),
   url VARCHAR(100) NOT NULL UNIQUE,
   git VARCHAR(1024) NOT NULL,
   env VARCHAR(20) NOT NULL,
   PRIMARY KEY ( id )
);

CREATE TABLE keywords(
   keyword_id INT NOT NULL AUTO_INCREMENT,
   project_id INT NOT NULL REFERENCES projects(id),
   value VARCHAR(100) NOT NULL,
   PRIMARY KEY ( keyword_id )
);


INSERT INTO users (email, password) VALUES ("a@a.be", "$2a$08$7xs2TSaM2eoLZdFRpmPYT.m.WfYck.zQ8QgmWVHj1Z6GKrSZQE2rC") -- coucou : coucou
