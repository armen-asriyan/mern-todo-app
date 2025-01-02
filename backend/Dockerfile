# Utiliser l'image officielle de Node.js
FROM node:lts-alpine

# Créer un répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json (ou yarn.lock si vous utilisez Yarn)
COPY ./package*.json ./

# Installer les dépendances définies dans package.json
RUN npm install

# Copier le reste du code de l'application backend dans le conteneur
COPY ./ ./

# Exposer le port sur lequel le serveur backend sera accessible (par défaut 5000)
EXPOSE 5000

# Définir la variable d'environnement NODE_ENV comme 'production'
# Cela aide à activer les optimisations pour l'environnement de production
ENV NODE_ENV=production


# Lancer l'application backend avec la commande 'npm run start'
CMD ["npm", "run", "start"]
