export interface Question {
    id: number
    text: string
    hint: string

}
export interface FeedBack {
    score?: number;
    ratingText: string;
    message?: string;
    professionTech: {
        tech: string;
        fields: { field: string; score: number }[];
    }[];
}
export interface TotalX {
    level: string
    profession: string
    stack: string[]
}
export interface Tech {
    professionTech?: { tech: string, fields: { field: string, score: number }[] }[]
}

export const colorMap: Record<string, string> = {
    html: "var(--color-html)",
    css: "var(--color-css)",
    javascript: "var(--color-js)",
    typescript: "var(--color-ts)",
    react: "var(--color-react)",
    "next.js": "var(--color-next)",
    node: "var(--color-node)",
    vue: "var(--color-vue)",
    sass: "var(--color-sass)",
    tailwind: "var(--color-tailwind)",
    default: "var(--color-default)",
};

export const colorMap2: Record<string, string> = {
    react: 'hsl(200, 70%, 50%)',
    angular: 'hsl(0, 70%, 50%)',
    'next.js': 'hsl(360 0% 0%)',
    vue: 'hsl(120, 70%, 40%)',
    default: 'hsl(0, 0%, 50%)',
    'front-end development': 'hsl(250, 70%, 50%)'
};
