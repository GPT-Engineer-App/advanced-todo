import React, { useState } from "react";
import { Box, Heading, Input, Button, Text, Flex, IconButton, Spacer, Checkbox, Select } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
    setEditTask(index);
    setEditText(tasks[index].text);
  };

  const handleUpdateTask = () => {
    if (editText.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[editTask].text = editText;
      setTasks(updatedTasks);
      setEditTask(null);
      setEditText("");
    }
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    } else if (filter === "completed") {
      return task.completed;
    }
    return true;
  });

  return (
    <Box maxWidth="500px" margin="auto" mt={8}>
      <Heading mb={8}>Todo App</Heading>
      <Flex mb={4}>
        <Input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Enter a new task" mr={2} />
        <Button onClick={handleAddTask} colorScheme="blue">
          <FaPlus />
        </Button>
      </Flex>
      <Select value={filter} onChange={(e) => setFilter(e.target.value)} mb={4}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </Select>
      {filteredTasks.map((task, index) => (
        <Flex key={index} alignItems="center" p={2} borderWidth={1} borderRadius="md" mb={2} bg={task.completed ? "gray.100" : "white"}>
          <Checkbox isChecked={task.completed} onChange={() => handleToggleComplete(index)} mr={2} />
          {editTask === index ? <Input value={editText} onChange={(e) => setEditText(e.target.value)} mr={2} /> : <Text textDecoration={task.completed ? "line-through" : "none"}>{task.text}</Text>}
          <Spacer />
          {editTask === index ? (
            <Button onClick={handleUpdateTask} colorScheme="green" mr={2}>
              Save
            </Button>
          ) : (
            <IconButton icon={<FaEdit />} onClick={() => handleEditTask(index)} mr={2} />
          )}
          <IconButton icon={<FaTrash />} onClick={() => handleDeleteTask(index)} />
        </Flex>
      ))}
    </Box>
  );
};

export default Index;
