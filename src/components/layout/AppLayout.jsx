import Tasks from '../task/Tasks';
import Header from './Header';

export default function AppLayout() {
    return (
        <main className="min-h-screen mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <Header />
            <Tasks/>
        </main>
    );
}
