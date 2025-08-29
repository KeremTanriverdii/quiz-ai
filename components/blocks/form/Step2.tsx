import React, { useEffect, useState } from 'react'
import { RadioGroupItem } from '@radix-ui/react-radio-group'
import { useRouter } from 'next/navigation'
import { profess } from '@/components/data/profession'
import { Label } from 'recharts'
import { RadioGroup } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'


interface Props {
    onNext: () => void
    onBack: () => void
}

export default function Step2({ onNext, onBack }: Props) {
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

    return (
        <>
            <div className="flex flex-col gap-4 w-full">
                <h2>Seçilen Seviye: <strong>{level}</strong></h2>
                <Label className="text-lg font-medium">Hangi alanda test yapmak istiyorsunuz?</Label>
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
                <p>Kullanılacak teknoloji seçimi ilerdeki sayfada yapılacaktır.</p>
                <Button onClick={onNext} className="w-fit">İlerle</Button>
                <Button onClick={onBack} className="w-fit">Geri</Button>
            </div>
        </>
    )

}
