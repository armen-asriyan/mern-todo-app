import express from "express";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/Task.controller.js";

// Créer une instance de routeur Express

const router = express.Router();

export default router; // Exporter le routeur pour l'utiliser dans d'autres fichiers

// Créer des routes pour les tâches

// Recuperer toutes les tâches
router.get("/", getTasks); // GET /api/tasks

// Créer une tâche
router.post("/", createTask); // POST /api/tasks

// Modifier une tâche par son ID
router.put("/:id", updateTask); // PUT /api/tasks/:id

// Supprimer une tâche par son ID
router.delete("/:id", deleteTask); // DELETE /api/tasks/:id
