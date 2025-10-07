'use client';

import React, { useEffect, useMemo, useState, useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { getDisabledOptions, profess } from '@/components/data/profession';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import PendingButtton from './PendingButtton';
import { serCookie } from '@/app/[locale]/interview/setCookie';

const initialState = null
async function generateQuestionWithState(_: any, formData: FormData) {
    // return await generateQuestion(formData)
}

type Selection = Record<string, string | string[]>;

interface Props {
    onBack: () => void;
    data: string[]
    id: string
}

export default function Step3({ onBack, data, id }: Props) {

    const [selections, setSelections] = useState<Selection>({});
    const [selectedLevel, setSelectedLevel] = useState<string>('');
    const [selectedProfession, setSelectedProfession] = useState<string>('');
    const disabledOptions = useMemo(() => getDisabledOptions(selections), [selections]);
    const [datax, setDatax] = useState<any>(data)
    const [state, formAction] = useActionState(generateQuestionWithState, initialState)
    const [pending, setPending] = useState(false)
    const router = useRouter();

    useEffect(() => {
        if (state) {
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


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        setPending(true)
        e.preventDefault()

        const formData = new FormData()
        formData.append("profession", selectedProfession)
        formData.append("level", selectedLevel)
        const stack = Object.values(selections).flat()
        formData.append("stack", JSON.stringify(stack))

        const result = await serCookie(formData)

        // SessionStorage ile Result sayfasına veri taşı
        // sessionStorage.setItem("questions", JSON.stringify(formData))
        // sessionStorage.setItem("meta", JSON.stringify({
        //     level: selectedLevel,
        //     profession: selectedProfession,
        //     techArray: selections
        // }))
        setPending(false)
        router.push("/interview/questions")
    }


    return (
        <form onSubmit={handleSubmit} className='space-y-6'>
            <input type='hidden' name='profession' value={selectedProfession} />
            <input type='hidden' name='level' value={selectedLevel} />
            <input type='hidden' name='stack' value={JSON.stringify(selections)} />

            <div className='flex flex-col font-bold'>
                <div className='flex justify-between font-bold lg:mb-3'>
                    <Label>{datax.choosenLevel + " " + selectedLevel.slice(0, 1).toUpperCase() + selectedLevel.slice(1)}</Label>
                    <Label>{id}/3</Label>
                </div>

                {/* <Label>{} </Label> */}
                <div>
                    {datax.choosenField} {selectedProfession}
                </div>
                {filteredProfession.map((profession) => (
                    <div key={profession.id} >
                        {profession.stack.map((item) => (
                            <div key={item.name} className='flex flex-col mx-xl-16 xl:mt-10 border-2 lg:p-5  w-full gap-6'>
                                <h4 className='font-semibold mb-2 pb-1 '>{item.name}</h4>

                                {/* MULTI SELECTION → ToggleGroup */}
                                {item.type === 'multi' && (
                                    <ToggleGroup
                                        type='multiple'
                                        value={(selections[item.name] as string[]) || []}
                                        onValueChange={(values) =>
                                            handleMultiChange(item.name, values)
                                        }
                                        className='gap-3'
                                    >
                                        {item.options?.map((opt) => (
                                            <ToggleGroupItem
                                                key={opt}
                                                value={opt}
                                                disabled={disabledOptions.has(opt)}
                                                className='capitalize lg:p-15 flex flex-col border border-zinc-900 card rounded-2xl'
                                            >
                                                <img src={`/${opt.toLowerCase().replace(/\s+/g, '-')}.svg`} alt={`${opt} icon`} className='object-contain w-auto h-auto' />
                                                {opt}
                                            </ToggleGroupItem>
                                        ))}
                                    </ToggleGroup>
                                )}

                                {/* SINGLE SELECTION → radio group */}
                                {item.type === 'single' && (
                                    <div>
                                        <ToggleGroup
                                            type="single"
                                            value={(selections[item.name] as string) || ""}
                                            onValueChange={(value) =>
                                                handleSingleChange(item.name, value)
                                            }
                                            className="flex gap-3"
                                        >
                                            {item.options?.map((opt) => (
                                                <ToggleGroupItem key={opt} value={opt} className={`flex flex-col border border-zinc-900 lg:p-15 rounded-2xl ${disabledOptions.has(opt) ? 'opacity-50 cursor-not-allowed' : ''
                                                    }`} disabled={disabledOptions.has(opt)}>
                                                    <img src={`/${opt.toLowerCase().replace(/\s+/g, '-')}.svg`} alt={`${opt} icon`} className='object-contain w-auto h-auto' />
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
            <div className='flex justify-center gap-2'>
                <Button type='button' onClick={onBack}>
                    {datax.back}
                </Button>
                {pending && <PendingButtton onOpen={pending} />}

                <Button disabled={!selections} type='submit'>start</Button>
            </div>
        </form>
    );
}
