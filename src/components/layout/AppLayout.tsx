import Tasks from '../task/Tasks';
import Header from './Header';
import type { Theme } from '../Task.types';
import type { Dispatch, SetStateAction } from 'react';

interface AppLayoutProps {
    theme: Theme;
    setTheme: Dispatch<SetStateAction<Theme>>;
}

export default function AppLayout({ theme, setTheme }: AppLayoutProps) {
    return (
        <main className="min-h-screen mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4">
            <Header theme={theme} setTheme={setTheme} />
            <Tasks />
        </main>
    );
}
