import { Button, Container, Group, Input } from "@chakra-ui/react";
import axios from "axios";

import React, { useState } from "react";

const NewTaskForm = ({ addTask }) => {
  const [task, setTask] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.trim() === "") {
      console.log("Le champ est vide");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/tasks", {
        name: task,
      });
      setTask("");
      addTask(response.data.task);

      console.log(response.data.task);
    } catch (error) {
      console.error("Error adding task:", error); // Added error logging
    }
  };

  return (
    <Container
      width="100%"
      maxW={{ base: "100%", sm: "90%", md: "80%", lg: "70%" }}
      p={0}
      my="8"
    >
      <form onSubmit={handleSubmit}>
        <Group
          w={"full"}
          display={"flex"}
          flexDirection={{ base: "column", sm: "row" }}
        >
          <Input
            bg={"gray.100"}
            color={"gray.900"}
            placeholder="Écrivez votre tâche..."
            size={"lg"}
            rounded="10px"
            name="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            w={"full"}
          />
          <Button
            type="submit"
            rounded="sm"
            my={{ base: "4", sm: 0 }}
            w={{ base: "full", sm: "auto" }}
            colorPalette={"blue"}
          >
            Ajouter une tâche
          </Button>
        </Group>
      </form>
    </Container>
  );
};

export default NewTaskForm;
