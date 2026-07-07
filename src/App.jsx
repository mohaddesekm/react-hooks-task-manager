import { useState } from 'react';
import './App.css';
import AppLayout from './components/layout/AppLayout';
import { useEffect } from 'react';

export default function App() {
    const [theme, setTheme] = useState('light');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme) {
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
