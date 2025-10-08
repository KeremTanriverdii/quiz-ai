import { defineField, defineType } from 'sanity'

export const questionsType = defineType({
    name: 'question',
    title: 'Question',
    type: 'document',
    fields: [
        defineField({
            name: 'type',
            title: 'Question Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Open', value: 'open' },
                    { title: 'MVC', value: 'mvc' }
                ],
                layout: 'radio'
            },
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'tech',
            title: 'Technology',
            type: 'string',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'level',
            title: 'Level',
            type: 'string',
            options: {
                list: [
                    { title: 'Junior', value: 'junior' },
                    { title: 'Mid', value: 'mid' },
                    { title: 'Senior', value: 'senior' },
                    { title: 'Lead', value: 'lead' }
                ]
            }
        }),
        defineField({
            name: 'difficulty',
            title: 'Difficulty',
            type: 'number',
            description: '1-5 arası',
            validation: (Rule) => Rule.min(1).max(5)
        }),
        defineField({
            name: 'translations',
            title: 'Question Translations',
            type: 'array',
            of: [{
                type: 'object', fields: [
                    { name: 'lang', type: 'string', options: { list: ['tr', 'en', 'fr'] }, validation: Rule => Rule.required() },
                    { name: 'text', type: 'text', validation: Rule => Rule.required() }
                ]
            }]
        }),
        defineField({
            name: 'hints',
            title: 'Hints',
            type: 'array',
            of: [{
                type: 'object', fields: [
                    { name: 'lang', type: 'string', options: { list: ['tr', 'en', 'fr'] }, validation: Rule => Rule.required() },
                    { name: 'text', type: 'text', validation: Rule => Rule.required() }
                ]
            }]
        }),
        defineField({
            name: 'templates',
            title: 'Templates (for Open questions)',
            type: 'array',
            of: [{
                type: 'object', fields: [
                    { name: 'lang', type: 'string', options: { list: ['tr', 'en', 'fr'] }, validation: Rule => Rule.required() },
                    { name: 'code', type: 'text', options: { language: 'javascript' } }
                ]
            }]
        }),
        defineField({
            name: 'options',
            title: 'Options (for MVC questions)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'label',
                            type: 'string',
                            description: 'Örn: A, B, C, ... Frontend label olarak kullanılır'
                        },
                        {
                            name: 'translations',
                            title: 'Option Translations',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    fields: [
                                        {
                                            name: 'lang',
                                            type: 'string',
                                            options: { list: ['tr', 'en', 'fr'] },
                                            validation: (Rule) => Rule.required()
                                        },
                                        { name: 'text', type: 'text', validation: (Rule) => Rule.required() },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        })
    ]
})
