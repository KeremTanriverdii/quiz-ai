import { defineType } from "sanity";

export const sessionType = defineType({
    name: 'session',
    title: 'Session',
    type: 'document',
    fields: [
        { name: 'userId', title: 'User ID', type: 'string' },
        { name: 'startedAt', title: 'Started At', type: 'datetime', initialValue: new Date().toISOString() },
        { name: 'completedAt', title: 'Completed At', type: 'datetime' },
        { name: 'techStack', title: 'Tech Stack', type: 'array', of: [{ type: 'string' }] },
        { name: 'level', title: 'Level', type: 'string' },
        { name: 'lang', title: 'Language', type: 'string' },
        {
            name: 'aiSummary',
            title: 'AI Summary',
            type: 'object',
            fields: [
                { name: 'overallScore', type: 'number' },
                { name: 'feedback', type: 'text' },
                { name: 'ratingText', type: 'string' }
            ]
        }
    ]
})
