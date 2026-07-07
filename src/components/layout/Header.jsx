import { Button } from '../ui/button';
import { Moon, Sun } from 'lucide-react';

export default function Header({ theme, setTheme }) {
    return (
        <div className="border-b bg-white rounded-lg dark:bg-zinc-900">
            <div className="flex justify-between items-center p-4 ">
                <div>
                    <h1 className="text-2xl font-bold">Task Manager</h1>
                    <p className="text-sm ">
                        Organize your work. Stay productive.{' '}
                    </p>
                </div>

                <Button
                    variant="outline"
                    onClick={() =>
                        setTheme((prev) =>
                            prev === 'light' ? 'dark' : 'light',
                        )
                    }
                    className="cursor-pointer"
                >
                    {theme === 'light' ? (
                        <Moon className="h-6 w-6" />
                    ) : (
                        <Sun className="h-6 w-6" />
                    )}
                </Button>
            </div>
        </div>
    );
}
