# Utiliser l'image officielle de Node.js pour la phase de build
FROM node:lts-alpine AS build

# Créer un répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier les fichiers et répertoires du projet dans le répertoire de travail
COPY ./ ./

# Build the frontend project (this should create the dist folder)
RUN npm run build

# Utiliser une image Nginx légère pour servir le contenu
FROM nginx:alpine

# Copier le contenu du dossier 'dist' vers le répertoire de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port 80 pour que Nginx puisse servir le site
EXPOSE 80

# Démarrer Nginx pour servir le site
CMD ["nginx", "-g", "daemon off;"]
