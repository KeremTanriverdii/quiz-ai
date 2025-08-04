"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Field() {
    const [inputValue, setInputValue] = useState<string>('');
    const [level, setLevel] = useState<string>('Junior');
    const [message, setMessage] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const router = useRouter();

    const onLevelChange = (value: string) => {
        setLevel(value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Sayfanın yeniden yüklenmesini engelle

        if (!inputValue && !level) {
            setMessage('Lütfen alan ve seviyeyi giriniz.')
            return
        }

        router.push(`/interview/${inputValue.toLowerCase()}/${level}`)
    };
    return (
        <>
            <p>İstediğiniz alanı propmta yazıp ve seviyenizi belirttikten sonra teste başlayabilirsiniz.</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Hangi alanda mülakat testi yapmak istersiniz?"
                    size={100}
                />
                <RadioGroup defaultValue="Junior" onValueChange={onLevelChange} value={level}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="junior" id="junior" />
                        <Label htmlFor="junior">Junior</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mid" id='mid'
                        />
                        <Label htmlFor="mid">Mid</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="senior" id="senior" />
                        <Label htmlFor="senior">Senior</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="expert" id="expert" />
                        <Label htmlFor="expert">Expert</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="lead" id="lead" />
                        <Label htmlFor="lead">Lead</Label>
                    </div>
                </RadioGroup>
                <Button type="submit" className="mt-4 dark:bg-white " >
                    {isSubmitting ? 'Sorular Oluşturuluyor' : 'Başla'}
                </Button>
                <Button className="mt-4 dark:bg-white">
                    <Link href='/form'>Başlata</Link>
                </Button>
            </form>
        </>
    )
}
