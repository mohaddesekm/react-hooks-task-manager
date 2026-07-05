import { Children } from 'react';
import Container from '../common/Container';
import Header from './Header';

export default function AppLayout({Children}) {
    return (
        <main className="min-h-screen bg-slate-100">
            <Container>
                <Header />
                {Children}
            </Container>
        </main>
    );
}
