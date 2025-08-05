'use client';

import React, { useEffect, useMemo, useState, useActionState } from 'react';
import { Button } from '../components/ui/button';
import { conflictMap, getDisabledOptions, profess } from '@/app/data/profession';
import { ToggleGroup, ToggleGroupItem } from '../components/ui/toggle-group';
import { Toggle } from '../components/ui/toggle';
import { generateQuestion } from './action';
import { useRouter } from 'next/navigation';

const initialState = null
async function generateQuestionWithState(_: any, formData: FormData) {
    return await generateQuestion(formData)
}

type Selection = Record<string, string | string[]>;

interface Props {
    onBack: () => void;
}

export default function Step3({ onBack }: Props) {
    const [selections, setSelections] = useState<Selection>({});
    const [selectedLevel, setSelectedLevel] = useState<string>('');
    const [selectedProfession, setSelectedProfession] = useState<string>('');
    const disabledOptions = useMemo(() => getDisabledOptions(selections), [selections]);

    const [state, formAction] = useActionState(generateQuestionWithState, initialState)
    const router = useRouter();

    useEffect(() => {
        if (state?.questions) {
            sessionStorage.setItem('interviewData', JSON.stringify(state))
            router.push('/interview/result')
        }
    }, [state, router])

    useEffect(() => {
        const level = localStorage.getItem('level');
        const storedProfession = localStorage.getItem('profession');

        if (storedProfession) setSelectedProfession(storedProfession);
        if (level) setSelectedLevel(level);
    }, []);

    const filteredProfession = profess.filter(
        (item) => item.name === selectedProfession
    );

    const handleMultiChange = (category: string, values: string[]) => {
        setSelections((prev) => {
            const updated = { ...prev };
            if (values.length === 0) {
                delete updated[category];
            } else {
                updated[category] = values;
            }
            return updated;
        });
    };

    const handleSingleChange = (category: string, value: string) => {
        setSelections((prev) => {
            const updated = { ...prev };
            if (!value || prev[category] === value) {
                delete updated[category];
            } else {
                updated[category] = value;
            }
            return updated;
        });
    };

    return (
        <form action={formAction} className='space-y-6'>
            <input type='hidden' name='profession' value={selectedProfession} />
            <input type='hidden' name='level' value={selectedLevel} />
            <input type='hidden' name='stack' value={JSON.stringify(selections)} />

            <div>
                {filteredProfession.map((profession) => (
                    <div key={profession.id} className='grid grid-cols-1 md:grid-cols-2  gap-10'>
                        <h2 className='text-xl font-bold mb-2'>{profession.name}</h2>
                        <h2>Level {selectedLevel}</h2>

                        {profession.stack.map((item) => (
                            <div key={item.name} className='flex flex-col mb-20 w-full items-center gap-10'>
                                <h4 className='font-semibold mb-2'>{item.name}</h4>

                                {/* MULTI SELECTION → ToggleGroup */}
                                {item.type === 'multi' && (
                                    <ToggleGroup
                                        type='multiple'
                                        value={(selections[item.name] as string[]) || []}
                                        onValueChange={(values) =>
                                            handleMultiChange(item.name, values)
                                        }
                                        className='grid grid-cols-1 md:grid-cols-2 gap-2'
                                    >
                                        {item.options?.map((opt) => (
                                            <ToggleGroupItem
                                                key={opt}
                                                value={opt}
                                                disabled={disabledOptions.has(opt)}
                                                className='capitalize h-[300px] p-5 flex flex-col border rounded-2xl'
                                            >
                                                <img src={`/${opt.toLowerCase().replace(/\s+/g, '-')}.svg`} alt={`${opt} icon`} className='w-full h-auto object-contain' />
                                                {opt}
                                            </ToggleGroupItem>
                                        ))}
                                    </ToggleGroup>
                                )}

                                {/* SINGLE SELECTION → radio group (elle kalabilir) */}
                                {item.type === 'single' && (
                                    <div>
                                        <ToggleGroup
                                            type="single"
                                            value={(selections[item.name] as string) || ""}
                                            onValueChange={(value) =>
                                                handleSingleChange(item.name, value)
                                            }
                                            className="grid grid-cols-1 md:grid-cols-2 gap-2"
                                        >
                                            {item.options?.map((opt) => (
                                                <ToggleGroupItem key={opt} value={opt} className={`flex flex-col h-[300px] border p-5 rounded-2xl ${disabledOptions.has(opt) ? 'opacity-50 cursor-not-allowed' : ''
                                                    }`} disabled={disabledOptions.has(opt)}>
                                                    <img src={`/${opt.toLowerCase().replace(/\s+/g, '-')}.svg`} alt={`${opt} icon`} className='w-full h-full object-contain' />
                                                    {opt}
                                                </ToggleGroupItem>
                                            ))}
                                        </ToggleGroup>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className='flex gap-2'>
                <Button type='button' onClick={onBack}>
                    Geri
                </Button>
                <Button type='submit'>Mülakatı Başlat</Button>
            </div>
        </form>
    );
}
