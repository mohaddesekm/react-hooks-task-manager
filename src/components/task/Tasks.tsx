import { useState, useEffect, useMemo, useCallback } from 'react';
import { Button } from '../ui/button';
import TaskItem from './TaskItem';
import { ClipboardList, SearchX } from 'lucide-react';
import type { Task as TaskType } from '../Task.types.js';

export default function Tasks() {
    const [taskTitle, setTaskTitle] = useState('');
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [deletedTask, setDeletedTask] = useState<{
        task: TaskType;
        index: number;
    } | null>(null);
    const [showUndo, setShowUndo] = useState(false);

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
            let newTask: TaskType = {
                id: crypto.randomUUID(),
                title,
                completed: false,
            };
            setTasks((prevTasks) => [...prevTasks, newTask]);
            setTaskTitle('');
        }
    };

    const handlerKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === 'Enter') {
            handleAddTask();
        }
    };

    const handlerRemoveTask = useCallback((id: string) => {
        setTasks((prevTasks) => {
            const index = prevTasks.findIndex((task) => task.id === id);

            if (index === -1) return prevTasks;

            const task = prevTasks[index];

            setDeletedTask({
                task,
                index,
            });

            setShowUndo(true);

            return prevTasks.filter((task) => task.id !== id);
        });
    }, []);

    useEffect(() => {
        if (!deletedTask) return;

        const timer = setTimeout(() => {
            setShowUndo(false);

            setTimeout(() => {
                setDeletedTask(null);
            }, 300);
        }, 5000);

        return () => clearTimeout(timer);
    }, [deletedTask]);

    const handleUndoDelete = useCallback(() => {
        if (!deletedTask) return;

        setTasks((prevTasks) => {
            const newTasks = [...prevTasks];

            newTasks.splice(deletedTask.index, 0, deletedTask.task);

            return newTasks;
        });

        setShowUndo(false);

        setTimeout(() => {
            setDeletedTask(null);
        }, 300);
    }, [deletedTask]);

    const handlerEditTask = useCallback((id: string, title: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, title } : task,
            ),
        );
    }, []);

    const handlerCompleted = useCallback(
        (id: string) => {
            setTasks(
                tasks.map((task) =>
                    task.id === id
                        ? { ...task, completed: !task.completed }
                        : task,
                ),
            );
        },
        [tasks],
    );

    const filteredTasks = useMemo(() => {
        let resault = tasks.filter((task) =>
            task.title.toLowerCase().includes(search.toLowerCase()),
        );

        if (filter === 'active') {
            resault = resault.filter((task) => !task.completed);
        }

        if (filter === 'completed') {
            resault = resault.filter((task) => task.completed);
        }

        return resault;
    }, [tasks, search, filter]);

    const totalTasks = tasks.length;

    const completedTasks = useMemo(() => {
        return tasks.filter((task) => task.completed).length;
    }, [tasks]);

    const pendingTasks = useMemo(() => {
        return tasks.filter((task) => !task.completed).length;
    }, [tasks]);

    const isSearching = search.trim() !== '' || filter !== 'all';

    return (
        <section className="mt-8 rounded-lg bg-white shadow dark:bg-zinc-900">
            <div className="flex gap-4 items-center p-4">
                <input
                    type="text"
                    className="w-full rounded-md bg-white p-2 outline-none dark:bg-zinc-800 dark:text-white border border-gray-300 dark:border-none"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="What needs to be done?"
                    onKeyDown={handlerKeyDown}
                />

                <Button onClick={handleAddTask}>Add Task</Button>
            </div>

            <div className="px-4 pb-4">
                <input
                    type="text"
                    className="w-full rounded-md bg-white p-2 outline-none  dark:bg-zinc-800 dark:text-white border border-gray-300 dark:border-none"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="flex gap-2 px-4 pb-2">
                <Button
                    onClick={() => setFilter('all')}
                    variant={filter === 'all' ? 'default' : 'outline'}
                >
                    All
                </Button>
                <Button
                    onClick={() => setFilter('active')}
                    variant={filter === 'active' ? 'default' : 'outline'}
                >
                    Active
                </Button>
                <Button
                    onClick={() => setFilter('completed')}
                    variant={filter === 'completed' ? 'default' : 'outline'}
                >
                    Completed
                </Button>
            </div>

            {filteredTasks.length ? (
                <ul className={`${tasks.length && 'p-4'}`}>
                    {filteredTasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggle={handlerCompleted}
                            onRemove={handlerRemoveTask}
                            onEdit={handlerEditTask}
                        />
                    ))}
                </ul>
            ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    {isSearching ? (
                        <SearchX className="mb-4 h-14 w-14 text-gray-300" />
                    ) : (
                        <ClipboardList className="mb-4 h-14 w-14 text-gray-300" />
                    )}

                    <h3 className="text-xl font-semibold">
                        {isSearching ? 'No matching tasks' : 'No tasks yet'}
                    </h3>

                    <p className="mt-2 text-gray-500">
                        {isSearching
                            ? 'Try changing your search or filter.'
                            : 'Add your first task to get started.'}
                    </p>
                </div>
            )}

            {filteredTasks.length ? (
                <div className="grid grid-cols-3 gap-4 p-4 border-t dark:bg-zinc-900 dark:border-zinc-700">
                    <div className="rounded-lg border p-4 text-center">
                        <p className="text-sm text-gray-500">Total</p>
                        <h3 className="text-2xl font-bold">{totalTasks}</h3>
                    </div>

                    <div className="rounded-lg border p-4 text-center">
                        <p className="text-sm text-gray-500">Completed</p>
                        <h3 className="text-2xl font-bold">{completedTasks}</h3>
                    </div>

                    <div className="rounded-lg border p-4 text-center">
                        <p className="text-sm text-gray-500">Pending</p>
                        <h3 className="text-2xl font-bold">{pendingTasks}</h3>
                    </div>
                </div>
            ) : (
                ''
            )}

            <div
                className={`fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-lg border bg-white px-3 py-4 shadow-lg transition-all duration-300 dark:border-zinc-700 dark:bg-zinc-800 ${
                    showUndo
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-4 opacity-0 pointer-events-none'
                }`}
            >
                <span className="text-sm text-gray-900 dark:text-white">
                    Task deleted
                </span>

                <Button onClick={handleUndoDelete}>Undo</Button>
            </div>
        </section>
    );
}
