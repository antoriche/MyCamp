# MyCamp
Liens fourni par le boilerplate
[Create React App](https://github.com/facebookincubator/create-react-app)  
[Guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md)  

## Installation du projet  

Requis NodeJS (testé sur 8.4)  
Installer les dépendances  
- npm install  

Démarrer le Serveur API sur le port 8080  
Attention, toutes modifications requièrent un redémarrage  
- npm run backend:start  

Démarrer l'application sur le port 3000  
- npm run frontend:start  

Ces deux opérations peuvent être synthétisées par (notez cependant que cette commande pose parfois problème)  
- npm start  

## Description de l'environnement  

Le dossier serveur contient le code du Serveur de l'API.  
- Le dossier Controllers contient les différentes routes de l'API.  
- Le dossier DataBase contient les fonctions liées aux requêtes à la base de donnée.  
- Le dossier Models contient les Fonctionnalitées et Objets métiers de l'application.  
- Le dossier Services contient différentes services utilitaires.  

Le dossier src contient le code du frontend. Dans celui-ci :   
- Le dossier Pages contient les différentes pages de l'application.  
- Le dossier Components contient les composants réutilisables.  
- Le dossier Services contient les services indépendants de React.