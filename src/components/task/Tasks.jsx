import { useState } from 'react';
import { Button } from '../ui/button';

export default function Tasks() {
    const [taskTitle, setTaskTitle] = useState('');
    const [tasks, setTasks] = useState([]);

    const handleAddTask = () => {
        const title = taskTitle.trim();

        if (title.length > 0) {
            let newTask = {
                id: crypto.randomUUID(),
                title,
                completed: false,
            };
            setTasks((prevTasks) => [...prevTasks, newTask]);
            setTaskTitle('');
        }
    };

    const handlerKeyPress = (event) => {
        if (event.code === 'Enter') {
            handleAddTask();
        }
    };

    return (
        <section className="mt-8 rounded-lg bg-white shadow">
            <div className="flex gap-4">
                <input
                    type="text"
                    className="w-full rounded-md bg-white px-4 py-2 outline-none"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="What needs to be done?"
                    onKeyPress={() => handlerKeyPress(event)}
                />

                <Button onClick={handleAddTask}>Add Task</Button>
            </div>

            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>{task.title}</li>
                ))}
            </ul>
        </section>
    );
}
