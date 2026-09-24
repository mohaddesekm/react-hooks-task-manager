import { Button } from '../ui/button';
import { memo, useState } from 'react';
import type { Task as TaskType } from '../Task.types.js';

type TaskItemProps = {
    task: TaskType;
    onRemove: (id: string) => void;
    onToggle: (id: string) => void;
    onEdit: (id: string, title: string) => void;
};

function TaskItem({ task, onRemove, onToggle, onEdit }: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitlte, setEditTitlte] = useState(task.title);

    const handleSave = () => {
        const title = editTitlte.trim();

        if (title.length === 0) return;

        onEdit(task.id, title);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditTitlte(task.title);
        setIsEditing(false);
    };

    return (
        <li className="flex flex-wrap gap-2.5 mt-3 sm:flex-nowrap justify-between items-center rounded-lg border bg-white p-4 dark:bg-zinc-800 dark:border-zinc-700">
            {isEditing ? (
                <input
                    type="text"
                    value={editTitlte}
                    onChange={(e) => setEditTitlte(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSave();
                        }

                        if (e.key === 'Escape') handleCancel();
                    }}
                    className="mr-4 w-full rounded-md border bg-white p-2 outline-none dark:bg-zinc-700 dark:text-white"
                    autoFocus
                />
            ) : (
                <span
                    className={`${task.completed && 'opacity-50 line-through'} break-all text-gray-900 dark:text-white`}
                >
                    {task.title}
                </span>
            )}

            <div className="flex gap-2">
                {isEditing ? (
                    <>
                        <Button onClick={handleSave}>Save</Button>
                        <Button variant="outline" onClick={handleCancel}>
                            Cancle
                        </Button>
                    </>
                ) : (
                    <div className="flex gap-2">
                        <Button
                            value="outline"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit
                        </Button>

                        <Button
                            variant={task.completed ? 'secondary' : 'default'}
                            onClick={() => onToggle(task.id)}
                        >
                            {task.completed ? 'Undo' : 'Done'}
                        </Button>

                        <Button onClick={() => onRemove(task.id)}>
                            Remove
                        </Button>
                    </div>
                )}
            </div>
        </li>
    );
}

export default memo(TaskItem);
