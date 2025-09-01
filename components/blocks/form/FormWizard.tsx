"use client"
import React, { useState } from 'react'
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

export default function FormWizard() {
    const [step, setStep] = useState<number>(1);

    return (
        <div>
            {step === 1 && <Step1 onNext={() => setStep(2)} />}
            {step === 2 && <Step2 onNext={() => setStep(3)} onBack={() => setStep(1)} />}
            {step === 3 && <Step3 onBack={() => setStep(2)} />}
        </div>
    )
}
