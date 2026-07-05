export default function Header() {
    return (
        <div className="border-b bg-white">
            <div className="flex justify-between items-center h-16">
                <div>
                    <h1 className="text-2xl font-bold">
                        React Hooks Task Manager
                    </h1>
                    <p className="text-sm ">
                        Practice React Hooks with a real project
                    </p>
                </div>

                <div>Theme</div>
            </div>
        </div>
    );
}
