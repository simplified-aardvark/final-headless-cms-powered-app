import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    useToast,
    Center
} from "@chakra-ui/react";
import React from "react";
import { doUseEffect } from "@/api/use-effect";
import useAuth from "../hooks/useAuth";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteTodo, toggleTodoStatus } from "../api/todo";


const TodoList = () => {
    const [todos, setTodos] = React.useState([]);
    const { user } = useAuth();
    const toast = useToast();

    doUseEffect(setTodos, "todo", user);

    const handleTodoDelete = async (id) => {
        if (confirm("Are you sure you wanna delete this todo?")) {
            deleteTodo(id);
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

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
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
                                >
                                    {todo.status}
                                </Badge>
                            </Heading>
                            <Text>{todo.description}</Text>
                        </Box>
                    ))}
            </SimpleGrid>
        </Box>
    );
};

export default TodoList;