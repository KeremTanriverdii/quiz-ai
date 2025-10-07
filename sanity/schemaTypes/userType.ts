import { defineType } from "sanity";

export const userType = defineType({
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'image', title: 'Image', type: 'image' },
        { name: 'userquestion', title: 'User Questions', type: 'array', of: [{ type: 'userQuestion' }], }
    ]
})