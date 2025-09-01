"use client"

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react"

interface Props {
  onNext: () => void
}

export default function Step1({ onNext }: Props) {
  const [level, setLevel] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('level', level);
  }, [level])

  return (
    <>
      <div>
        {/* <h2>Seçilen Alan: <strong>{inputValue}</strong></h2> */}
        <Label>Hangi seviyede olduğunuzu seçiniz.</Label>

        <RadioGroup onValueChange={setLevel} value={level} className='mt-5'>
          {['junior', 'mid', 'senior', 'lead'].map((lvl) => (
            <div key={lvl} className='flex items-center space-x-2'>
              <RadioGroupItem value={lvl} id={lvl} className='border-2 border-gray-400 rounded-full w-4 h-4 data-[state=checked]:bg-black' />
              <Label htmlFor={lvl}>{lvl[0].toUpperCase() + lvl.slice(1)}</Label>
            </div>
          ))}
        </RadioGroup>

        <Button onClick={onNext} className="mt-4 dark:bg-white">
          İlerle
        </Button>
      </div>

    </>
  )
}
