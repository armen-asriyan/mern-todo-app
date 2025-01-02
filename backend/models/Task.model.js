import mongoose from "mongoose";
// Créer un schéma pour les tâches
const taskSchema = new mongoose.Schema(
  {
    name: {
      // Champ name
      type: String, // Type de données: chaîne de caractères
      required: true, // Champ obligatoire
    },
    completed: {
      // Champ completed
      type: Boolean, // Type de données: booléen
      default: false, // Valeur par défaut: false
    },
  },
  {
    timestamps: true, // Ajouter des horodatages (timestamps) pour chaque tâche
  }
);

// Créer un modèle pour les tâches
/**
 * @param {String} "Task" - Nom du modèle, sera transformé en minuscules et au pluriel par Mongoose
 * @param {Object} taskSchema - Schéma de la tâche
 */
const Task = mongoose.model("Task", taskSchema);

// Exporter le modèle Task
export default Task;
