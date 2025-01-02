// Importer les modules
import dotenv from "dotenv"; // Importer le module dotenv pour charger les variables d'environnement
import express from "express"; // Importer le module express pour créer une application Express
import cors from "cors"; // Importer le module cors pour autoriser les requêtes de n'importe quelle origine
import { connectDB } from "./config/db.js"; // Importer la fonction connectDB pour se connecter à la base de données MongoDB
import taskRoutes from "./routes/Task.routes.js"; // Importer les routes pour les tâches

// Configurer dotenv pour charger les variables d'environnement
dotenv.config();

// Créer une application Express
const app = express();
// Utiliser CORS pour autoriser les requêtes de n'importe quelle origine
app.use(cors());
// Utiliser le middleware pour analyser les données JSON
app.use(express.json());

// Définir le port du serveur depuis une variable d'environnement ou le port 3000 par défaut
const PORT = process.env.PORT || 3000;

// Créer une route pour la page d'accueil
app.get("/", (req, res) => {
  res.send("Hello World");
});

/**
 * Créer une route pour la page d'accueil
 * @param {String} "/" - URL de la route
 * @param {function} "taskRoutes" - Utiliser le contrôleur de tâches pour gérer les requêtes
 */
app.use("/api/tasks", taskRoutes);

// Lancer le serveur sur le port spécifié
app.listen(PORT, () => {
  // Se connecter à la base de données MongoDB
  connectDB();
  // Afficher un message pour indiquer que le serveur est opérationnel
  console.log(`Le serveur est operationnel sur http://localhost:${PORT}`);
});
