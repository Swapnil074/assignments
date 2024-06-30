import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Checkbox,
  Stack,
  Center,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Input,
  FormControl,
  FormLabel,
  Flex,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

const TodoList: React.FC = ({userId}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [isAdding, setIsAdding] = useState(false);


  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/todo/', {
        userId,
      });
      console.log(response)
      setTodos(response.data.todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAddTodo = async () => {

    try {
      const response = await axios.post('http://localhost:8000/api/v1/todo/create', {
        title: newTodo.title,
        description: newTodo.description,
        userId, 
      });
      setTodos([...todos, response.data.todo]);
      setNewTodo({ title: '', description: '' });
      setIsAdding(false);
    } catch (error) {
      console.error('Error creating todo:', error);
      
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await axios.delete('http://localhost:8000/api/v1/todo/delete', {
        data: {
          userId, // Replace with actual userId or get from authentication
          todoId: id,
        },
      });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
      // Handle error, e.g., show an error message
    }
  };

  const handleCheckboxChange = async (id: number) => {
    try {
      const updatedTodo = todos.find(todo => todo.id === id);
      if (!updatedTodo) return;

      const response = await axios.post('http://localhost:8000/api/v1/todo/edit', {
        userId, // Replace with actual userId or get from authentication
        todoId: id,
        title: updatedTodo.title,
        description: updatedTodo.description,
        done: !updatedTodo.done,
      });
      setTodos(todos.map(todo =>
        todo.id === id ? response.data.todo : todo
      ));
    } catch (error) {
      console.error('Error updating todo:', error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <Center w="80vw" h="90vh" bg="gray.100">
      <Box w="80%" mx="auto" mt="4">
        <Button colorScheme="teal" onClick={() => setIsAdding(true)} mb="4">Add Todo</Button>
        {isAdding && (
          <Box mt="4" p="4">
            <FormControl id="title" mb="4">
              <FormLabel>Title</FormLabel>
              <Input
                value={newTodo.title}
                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                placeholder="Enter title"
              />
            </FormControl>
            <FormControl id="description" mb="4">
              <FormLabel>Description</FormLabel>
              <Input
                value={newTodo.description}
                onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                placeholder="Enter description"
              />
            </FormControl>
            <Button colorScheme="teal" onClick={handleAddTodo} mr="2">Create</Button>
            <Button onClick={() => setIsAdding(false)}>Cancel</Button>
          </Box>
        )}

        {todos.length === 0 ? (
          <Center mt="4">
            <Text fontSize="xl">No todos available.</Text>
          </Center>
        ) : (
          <Stack mt="4" spacing="4">
            {todos.map(todo => (
              <Accordion key={todo.id} allowToggle>
                <AccordionItem border="none" bg="white" shadow="md" rounded="md" justifyContent={'space-between'}>
                  <AccordionButton p="4" _hover={{ bg: "gray.200" }}>
                    <Flex alignItems='stretch' w="100%">
                      <Checkbox
                        isChecked={todo.done}
                        onChange={() => handleCheckboxChange(todo.id)}
                        mr="4"
                        textDecoration={todo.done ? "line-through" : "none"}
                        color={todo.done ? "gray.500" : "inherit"}
                      >
                        {todo.title}
                      </Checkbox>
                      <Button
                        onClick={() => handleDeleteTodo(todo.id)}
                        colorScheme="red"
                        variant="ghost"
                        _hover={{ bg: "red.500", color: "white" }}
                      >
                        <DeleteIcon />
                      </Button>
                    </Flex>
                  </AccordionButton>
                  <AccordionPanel p={4}>
                    {todo.description}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            ))}
          </Stack>
        )}
      </Box>
    </Center>
  );
};

export default TodoList;
