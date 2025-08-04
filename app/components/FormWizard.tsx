"use client"
import React, { useState } from 'react'
import Step1 from './ClientComponents/Step1';
import Step2 from './ClientComponents/Step2';
import Step3 from './ClientComponents/Step3';

export default function FormWizard() {
    const [step, setStep] = useState<number>(1);
    console.log(step)
    return (
        <div>
            {step === 1 && <Step1 onNext={() => setStep(2)} />}
            {step === 2 && <Step2 onNext={() => setStep(3)} onBack={() => setStep(1)} />}
            {step === 3 && <Step3 onBack={() => setStep(2)} />}

        </div>
    )
}
