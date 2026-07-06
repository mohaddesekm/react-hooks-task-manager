import { useState, useEffect, useMemo } from 'react';
import { Button } from '../ui/button';

export default function Tasks() {
    const [taskTitle, setTaskTitle] = useState('');
    const [tasks, setTasks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [search, setSearch] = useState('');

    // const [tasks, setTasks] = useState(() => {
    //     const savedTasks = localStorage.getItem('tasks');
    //     return savedTasks ? JSON.parse(savedTasks) : [];
    // });

    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');

        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (!isLoaded) return;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks, isLoaded]);

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

    const handlerKeyDown = (event) => {
        if (event.code === 'Enter') {
            handleAddTask();
        }
    };

    const handlerRemoveTask = (id) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    const handlerCompleted = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task,
            ),
        );
    };

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) =>
            task.title.toLowerCase().includes(search.toLowerCase()),
        );
    }, [tasks, search]);

    return (
        <section className="mt-8 rounded-lg bg-white shadow">
            <div className="flex gap-4 items-center p-4">
                <input
                    type="text"
                    className="w-full rounded-md bg-white py-2 outline-none"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="What needs to be done?"
                    onKeyDown={handlerKeyDown}
                />

                <Button onClick={handleAddTask}>Add Task</Button>
            </div>

            <input
                type="text"
                className="w-full rounded-md bg-white p-4 outline-none"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <ul className={`${tasks.length && 'p-4'}`}>
                {filteredTasks.map((task) => (
                    <li
                        key={task.id}
                        className="mt-3 flex justify-between items-center rounded-lg border bg-white p-4"
                    >
                        <span
                            className={`${task.completed && 'opacity-50 line-through'}`}
                        >
                            {task.title}
                        </span>
                        <div className="flex gap-2">
                            <Button
                                variant={
                                    task.completed ? 'secondary' : 'default'
                                }
                                onClick={() => handlerCompleted(task.id)}
                                className=""
                            >
                                {task.completed ? 'Undo' : 'Done'}
                            </Button>
                            <Button onClick={() => handlerRemoveTask(task.id)}>
                                Remove
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
