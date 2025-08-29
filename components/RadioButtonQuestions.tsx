"use client"
import React, { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '../../../components/ui/radio-group';

interface RadioButtonQuestionsProps {
    options: string[];
    questionId: string;
}

export default function RadioButtonQuestions(
    { options, questionId }: RadioButtonQuestionsProps

) {
    return (
        <RadioGroup name={`question-${questionId}`}>
            {options.map((option, oIndex) => (
                <label key={oIndex} style={{
                    display: 'block',
                    padding: '12px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    backgroundColor: 'white',
                    transition: 'background-color 0.2s',
                }}>
                    <RadioGroupItem
                        value={String(oIndex)}
                        id={`${questionId}-${oIndex}`}
                        style={{ marginRight: '10px' }}
                    />
                    {String.fromCharCode(65 + oIndex)}. {option}
                </label>
            ))}
        </RadioGroup>

    )
}
