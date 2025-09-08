import React, { use, useEffect, useState } from 'react'
import { profess } from '@/components/data/profession'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'


interface Props {
    onNext: () => void
    onBack: () => void
    data: any,
    id: string
}

export default function Step2({ onNext, onBack, data, id }: Props) {
    const [level, setLevel] = useState<string>('')
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        const storedLevel = localStorage.getItem('level')
        if (storedLevel) {
            setLevel(storedLevel);
            localStorage.setItem('profession', inputValue)
        } else {
            console.warn('LocalStorage lvl error')
        }

    }, [inputValue]);

    const [datax, setData] = useState<any>(data)
    console.log(datax)
    return (
        <>
            <div className="flex flex-col gap-4 w-full">
                <div className="flex justify-between">
                    <Label className="text-lg font-medium">{datax.welcome}</Label>
                    <Label>{id}/3</Label>
                </div>
                <h2>{datax.choosenLevel} <strong>{level.slice(0, 1).toUpperCase() + level.slice(1)}</strong></h2>
                {/* <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Örnek: frontend, backend, full stack..." /> */}
                <div className=''>
                    <RadioGroup value={inputValue} onValueChange={setInputValue} className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                        {profess.map((pro) => (
                            <div key={pro.id} className='flex  gap-5 items-center'>
                                <Label>
                                    <RadioGroupItem value={pro.name} className='border-2 border-gray-400 rounded-full w-4 h-4 data-[state=checked]:bg-black' />
                                    {pro.name}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
                <p className='lg:mt-10 lg:mb-10'>{datax.informNext}</p>
                <div className='flex gap-2 justify-center'>
                    <Button onClick={onBack} className="w-fit">{datax.back}</Button>
                    <Button onClick={onNext} className="w-fit" disabled={!inputValue}>{datax.next}</Button>
                </div>
            </div>
        </>
    )

}
