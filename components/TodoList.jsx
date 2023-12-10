import React, { useState } from 'react';
import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    useToast,
    Center,
    useColorModeValue
} from "@chakra-ui/react";
import { doUseEffect } from "@/api/use-effect";
import useAuth from "../hooks/useAuth";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { toggleTodoStatus } from "../api/todo";
import { deleteRecord } from '@/api/delete-record';


const TodoList = () => {
    const secondaryTextColor = useColorModeValue("black", "#fff");

    const [todos, setTodos] = useState([]);
    const { user } = useAuth();
    const toast = useToast();

    doUseEffect(setTodos, "todo", user);

    const handleTodoDelete = async (id) => {
        if (confirm("Are you sure you wanna delete this todo?")) {
            deleteRecord(id, "todo");
            toast({ title: "Todo deleted successfully", status: "success" });
        }
    };

    const handleToggle = async (id, status) => {
        const newStatus = status == "completed" ? "pending" : "completed";
        await toggleTodoStatus({ docId: id, status: newStatus });

        toast({
            title: `Todo marked ${newStatus}`,
            status: newStatus == "completed" ? "success" : "warning",
        });
    };
    return (

        <Box mt={5} mb={50}>
            <Center>
                <Heading as="h1" mb={10}>To-Dos</Heading>
            </Center>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                {todos &&
                    todos.map((todo) => (
                        <Box
                            p={3}
                            boxShadow="2xl"
                            shadow={"dark-lg"}
                            transition="0.2s"
                            _hover={{ boxShadow: "sm" }}
                            key={todo.id}
                        >
                            <Heading as="h3" fontSize={"xl"}>
                                <a href={"/todo/" + todo.id}>{todo.title}</a>
                                <Badge
                                    color="red.500"
                                    bg="inherit"
                                    transition={"0.2s"}
                                    _hover={{
                                        bg: "inherit",
                                        transform: "scale(1.2)",
                                    }}
                                    float="right"
                                    size="xs"
                                    onClick={() => handleTodoDelete(todo.id)}
                                >
                                    <FaTrash />
                                </Badge>
                                <Badge

                                    color={todo.status == "pending" ? "gray.500" : "green.500"}
                                    bg="inherit"
                                    transition={"0.2s"}
                                    _hover={{
                                        bg: "inherit",
                                        transform: "scale(1.2)",
                                    }}
                                    float="right"
                                    size="xs"
                                    onClick={() => handleToggle(todo.id, todo.status)}
                                >
                                    {todo.status == "pending" ? <FaToggleOff /> : <FaToggleOn />}
                                </Badge>
                                <Badge
                                    float="right"
                                    opacity="0.8"
                                    bg={todo.status == "pending" ? "yellow.500" : "green.500"}
                                    color={secondaryTextColor}
                                    py={"1px"}
                                >
                                    {todo.status}
                                </Badge>
                            </Heading>
                            <Text>
                                {todo.description.length > 36 ? todo.description.substring(0,36)+"..." : todo.description}
                            </Text>
                        </Box>
                    ))}
            </SimpleGrid>
        </Box>
    );
};

export default TodoList;