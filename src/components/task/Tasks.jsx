import { useState } from 'react';
import { Button } from '../ui/button';

export default function Tasks() {
    const [taskTitle, setTaskTitle] = useState('');
    const [tasks, setTasks] = useState([]);

    return (
        <section className="mt-8 rounded-lg bg-white shadow">
            <div className="flex gap-4">
                <input
                    type="text"
                    className="w-full rounded-md bg-white px-4 py-2 outline-none"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="What needs to be done?"
                />

                <Button>Add Task</Button>
            </div>
        </section>
    );
}
