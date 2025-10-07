import { defineField } from "sanity";


export const userQuestion = defineField({
    name: 'userQuestion',
    title: 'User Question',
    type: 'document',
    fields: [
        { name: 'userId', type: 'string' },
        { name: 'session', type: 'reference', to: [{ type: 'session' }] },
        { name: 'question', type: 'reference', to: [{ type: 'question' }] },
        { name: 'answer', type: 'text' },
        { name: 'isCorrect', type: 'boolean' },
        { name: 'score', type: 'number' },
        {
            name: 'aiResp',
            title: 'AI Response',
            type: 'object',
            fields: [
                { name: 'correctness', type: 'number' },
                { name: 'code_quality', type: 'number' },
                { name: 'efficiency_depth', type: 'number' },
                { name: 'problem_solving', type: 'number' },
                { name: 'completeness', type: 'number' },
                { name: 'overall_score', type: 'number' },
                { name: 'ratingText', type: 'string' },
                { name: 'feedback', type: 'text' },
            ]
        },
        { name: 'answeredAt', type: 'datetime', initialValue: new Date().toISOString() },
    ]
})