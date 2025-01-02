/* eslint-disable react/prop-types */
import { useState } from "react";

import axios from "axios";

import { MdEditSquare } from "react-icons/md";
import { IconButton, Input } from "@chakra-ui/react";

import { Button } from "@/components/ui/button";

import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const EditForm = ({ task, setTasks }) => {
  const [taskName, setTaskName] = useState(task.name);

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
        name: taskName,
      });
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t._id === task._id ? { ...t, name: taskName } : t
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <IconButton
          aria-label={`Modifier la tâche "${task.name}"`}
          colorPalette="yellow"
          w="auto"
        >
          <MdEditSquare />
        </IconButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Modifier la tâche </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Input
            value={taskName}
            name="taskName"
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Nom de la tâche"
          />
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Annuler</Button>
          </DialogActionTrigger>
          <DialogActionTrigger asChild>
            <Button onClick={handleEditSubmit}>Enregistrer</Button>
          </DialogActionTrigger>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default EditForm;
