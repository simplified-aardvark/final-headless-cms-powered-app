import TodoList from "../components/TodoList";
import CalendarEventList from "@/components/CalendarEventList";
import ContactList from "@/components/ContactList";

export default function Home() {
    return (
        <>
            <TodoList />
            <hr></hr>
            <CalendarEventList />
            <hr></hr>
            <ContactList />
        </>
    );
}