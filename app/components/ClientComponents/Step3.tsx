import { profess } from '@/app/data/profession';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';

// State tipi tanımı
type Selection = Record<string, string | string[]>;

interface Props {
    onBack: () => void
}

export default function Step3({ onBack }: Props) {
    const [selections, setSelections] = useState<Selection>({});
    const [selectedProfession, setSelectedProfession] = useState<string>('');
    const [selectedStack, setSelectedStack] = useState({});

    useEffect(() => {
        const storedProfession = localStorage.getItem("profession");
        const storedStack = localStorage.getItem("selectedStack");

        if (storedProfession) {
            setSelectedProfession(storedProfession);
        }
        if (storedStack) {
            setSelectedStack(JSON.parse(storedStack));
        }
    }, []);

    useEffect(() => {
        if (selectedProfession) {
            localStorage.setItem("profession", JSON.stringify(selectedProfession));
        }
    }, [selectedProfession]);


    const toggleOption = (category: string, option: string) => {
        setSelections((prev) => {
            const current = prev[category];
            if (Array.isArray(current)) {
                if (current.includes(option)) {
                    return { ...prev, [category]: current.filter((o) => o !== option) };
                } else {
                    return { ...prev, [category]: [...current, option] };
                }
            }
            return { ...prev, [category]: [option] };
        });
    };

    const selectSingle = (category: string, value: string) => {
        setSelections((prev) => ({ ...prev, [category]: value }));
    };

    const filteredProfession = profess.filter((id) => id.name === selectedProfession)
    console.log(selectedProfession)
    return (
        <div className=" space-y-6">
            {filteredProfession.map((profession) => (
                <div key={profession.id} className="border p-4 rounded-xl shadow">
                    <h2 className="text-xl font-bold mb-2">{profession.name}</h2>

                    {profession.stack.map((item) => (
                        <div key={item.name} className="mb-4">
                            <h4 className="font-semibold mb-1">{item.name}</h4>

                            {item.type === 'multi' && item.options?.map((opt: string) => (
                                <button
                                    key={opt}
                                    onClick={() => toggleOption(item.name, opt)}
                                    className={`border px-3 py-1 mr-2 mb-2 rounded-full transition-all duration-150 ${Array.isArray(selections[item.name]) && selections[item.name].includes(opt)
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-800'
                                        }`}
                                >
                                    {opt}
                                </button>
                            ))}

                            {item.type === 'single' && item.options?.map((opt: string) => (
                                <label key={opt} className="inline-flex items-center mr-4">
                                    <input
                                        type="radio"
                                        name={item.name}
                                        value={opt}
                                        checked={selections[item.name] === opt}
                                        onChange={() => selectSingle(item.name, opt)}
                                        className="mr-1"
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
            <div className='flex gap-2'>
                <Button onClick={onBack}>Geri</Button>
                <Button>Mülakatı Başlat</Button>
            </div>
        </div>
    );
}
