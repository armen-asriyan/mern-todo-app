/* eslint-disable react/prop-types */
import { Container, IconButton, List, Box } from "@chakra-ui/react";
import { MdOutlineDeleteOutline } from "react-icons/md";

import { Checkbox } from "@/components/ui/checkbox";

import { useState } from "react";
import axios from "axios";
import EditForm from "./EditForm";

// Un composant TaskList qui prend une liste de tâches et les affiche
const TaskList = ({ tasks, setTasks }) => {
  const [checkedTasks, setCheckedTasks] = useState({});

  const handleCheckboxChange = (taskId, checked) => {
    setCheckedTasks((prevCheckedTasks) => ({
      ...prevCheckedTasks,
      [taskId]: checked,
    }));
  };

  // Une fonction pour supprimer une tâche par son ID
  const handleDelete = (id) => async () => {
    try {
      // Supprimer la tâche avec l'ID spécifié
      const response = await axios.delete(
        `http://localhost:5000/api/tasks/${id}`
      );
      // Mettre à jour l'état local avec les tâches restantes
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      console.log(response.data.message);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <Container
      width="100%"
      maxW={{ base: "100%", sm: "90%", md: "80%", lg: "70%" }}
      p={0}
    >
      <List.Root spacing={4} display={"flex"} flexDirection={"column-reverse"}>
        {/* Creer une liste de tâches avec des cases à cocher, des boutons pour modifier et supprimer une tâche */}
        {tasks.map((task) => (
          <List.Item
            key={task._id}
            display="flex"
            justifyContent="space-between"
            flexDirection={{ base: "column", sm: "row", md: "row" }}
            alignItems="center"
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
            p={2}
            my={1}
            boxShadow="sm"
          >
            {/* Un composant de case à cocher pour marquer une tâche comme terminée */}
            <Checkbox
              checked={checkedTasks[task._id] || false}
              onCheckedChange={(e) =>
                handleCheckboxChange(task._id, !!e.checked)
              }
              size="lg"
              mx={2}
              colorPalette="gray"
              variant="subtle"
              aria-label={`Marquer la tâche "${task.name}" comme terminée`}
              id={task._id}
              margin={{ base: "2", sm: "0" }}
            >
              {task.name}
            </Checkbox>
            {/* <Text>{task.name}</Text> */}
            {/* Des boutons pour modifier et supprimer une tâche */}
            <Box display="flex" spaceX={2}>
              <EditForm task={task} setTasks={setTasks} />

              <IconButton
                aria-label={`Supprimer la tâche "${task.name}"`}
                colorPalette="red"
                onClick={handleDelete(task._id)}
              >
                <MdOutlineDeleteOutline />
              </IconButton>
            </Box>
          </List.Item>
        ))}
      </List.Root>
    </Container>
  );
};

export default TaskList;
