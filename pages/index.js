import { Container } from "@chakra-ui/react";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import CalendarEventList from "@/components/CalendarEventList";
import { Fragment } from "react";

export default function Home() {
    return (
        <>
            <TodoList />
            <hr></hr>
            <CalendarEventList />
        </>
    );
}