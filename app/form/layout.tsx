export default function FormLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-w-7xl  mx-auto mt-20 p-6 border rounded shadow">
            <h1 className="text-2xl font-bold mb-6">Mülakat Hazırlık Formu</h1>
            {children}
        </div>
    );
}
