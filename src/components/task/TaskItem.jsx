import { Button } from '../ui/button';
import { memo } from 'react';

function TaskItem({ task, onRemove, onToggle }) {
    return (
        <li className="mt-3 flex justify-between items-center rounded-lg border bg-white p-4 dark:bg-zinc-800 dark:border-zinc-700">
            <span className={`${task.completed && 'opacity-50 line-through'} break-all text-gray-900 dark:text-white`}>
                {task.title}
            </span>
            <div className="flex gap-2">
                <Button
                    variant={task.completed ? 'secondary' : 'default'}
                    onClick={() => onToggle(task.id)}
                    className=""
                >
                    {task.completed ? 'Undo' : 'Done'}
                </Button>
                <Button onClick={() => onRemove(task.id)}>Remove</Button>
            </div>
        </li>
    );
}

export default memo(TaskItem);
