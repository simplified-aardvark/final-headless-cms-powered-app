import TodoList from "../components/TodoList";
import CalendarEventList from "@/components/CalendarEventList";
import ContactList from "@/components/ContactList";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function Home() {
    return (
        <>
            <Tabs>
                <TabList>
                    <Tab>To-Dos</Tab>
                    <Tab>Calendar Events</Tab>
                    <Tab>Contact</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <TodoList />
                    </TabPanel>
                    <TabPanel>
                        <CalendarEventList />   
                    </TabPanel>
                    <TabPanel>
                        <ContactList />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
}