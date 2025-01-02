import Task from "../models/Task.model.js";
import mongoose from "mongoose";

// Recuperer toutes les tâches
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error(`Erreur: ${error.message}`);
    res.status(404).json({ success: false, message: error.message });
  }
};

// Créer une tâche
export const createTask = async (req, res) => {
  const { name } = req.body;
  const newTask = new Task({ name });

  try {
    const task = await newTask.save();
    res.status(201).json({ success: true, task: newTask });
  } catch (error) {
    console.error(`Erreur: ${error.message}`);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Modifier une tâche par son ID
export const updateTask = async (req, res) => {
  // Renommer id en _id pour éviter les erreurs de nommage avec MongoDB
  const { id: _id } = req.params;
  // Récupérer les données de la tâche
  const task = req.body;

  // Vérifier si l'ID est valide / existant
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Aucune tâche avec cet ID");
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      // Trouver la tâche par son ID et la mettre à jour
      _id,
      { ...task, _id }, // Mettre à jour la tâche avec les nouvelles données
      { new: true } // new: true pour retourner la tâche mise à jour plutôt que l'ancienne
    );

    res.status(200).json({ success: true, data: updatedTask }); // Répondre avec la tâche mise à jour
  } catch (error) {
    // Gérer les erreurs
    console.error(`Erreur: ${error.message}`);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Supprimer une tâche par son ID
export const deleteTask = async (req, res) => {
  const { id: _id } = req.params; // Renommer id en _id pour éviter les erreurs de nommage avec MongoDB

  // Vérifier si l'ID est valide / existant
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Aucune tâche avec cet ID");
  }

  try {
    await Task.findByIdAndDelete(_id); // Trouver la tâche par son ID et la supprimer
    res.status(200).json({ success: true, message: "Tâche supprimée" }); // Répondre avec un message
  } catch (error) {
    // Gérer les erreurs
    console.error(`Erreur: ${error.message}`); // Afficher l'erreur dans la console
    res.status(400).json({ success: false, message: error.message }); // Répondre avec un message d'erreur
  }
};
