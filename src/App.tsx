import { useState, useEffect } from 'react';
import './App.css';
import AppLayout from './components/layout/AppLayout';
import type { Theme } from './components/Task.types';

export default function App() {
    const [theme, setTheme] = useState<Theme>('light');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'light' || savedTheme === 'dark') {
            setTheme(savedTheme);
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (!isLoaded) return;
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme, isLoaded]);

    return (
        <div className="bg-slate-100 dark:bg-zinc-950">
            <AppLayout theme={theme} setTheme={setTheme} />
        </div>
    );
}
