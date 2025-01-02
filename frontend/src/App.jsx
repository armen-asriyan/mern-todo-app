import TaskList from "./components/TaskList";
import NewTaskForm from "./components/NewTaskForm";
import { Box, Heading } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  // useEffect se déclenche après le premier rendu et après chaque mise à jour
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks");
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  return (
    <Box minH={"100vh"} p={4} as={"main"}>
      <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
        Gestionnaire de tâches
      </Heading>
      <NewTaskForm addTask={addTask} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </Box>
  );
}

export default App;
