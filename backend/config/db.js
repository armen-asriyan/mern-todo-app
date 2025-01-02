// Importer le module mongoose pour se connecter à la base de données MongoDB
import mongoose from "mongoose";

// Connexion à la base de données MongoDB
export const connectDB = async () => {
  try {
    // Essayer de se connecter à la base de données
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // Afficher un message si la connexion est établie avec le host de la base de données
    console.log(
      `Connexion à la base de données MongoDB établie: ${conn.connection.host}`
    );
    // Retourner la connexion
    return conn;
  } catch (error) {
    // Gérer les erreurs
    console.error("Erreur de connexion à la base de données", error);
    // Quitter le processus (Node.js) avec un code d'erreur
    process.exit(1); // 1 signifie qu'il y a une erreur, 0 signifie qu'il n'y a pas d'erreur
  }
};
