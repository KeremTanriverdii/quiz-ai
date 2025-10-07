export interface Question {

    id: number | string
    text: string
    hint: string
    type: string
    difficulty?: number
    tech: string
    template: string
    options?: string[]
    stack?: string[]
}
export type AiResp = {
    score?: {
        correctness?: number
        code_quality?: number
        efficiency_depth?: number
        problem_solving?: number
        completeness?: number
    }
    overall_score?: number
    ratingText?: string
    feedback?: string
    professionTech?: { tech: string; fields: { field: string; score: number }[] }[]
    [k: string]: any
}
export interface FeedBack {
    score?: {
        correctness: number
        code_quality: number
        efficiency_depth: number
        problem_solving: number
        completeness: number
    };
    ratingText: string;
    overall_score: number;
    message?: string;
    feedback: string;
    professionTech: {
        tech: string;
        fields: { field: string; score: number }[];
    }[];
}
export interface Answers {
    key: string
    value: string
}

export interface techField {
    tech: string;
    fields: { score: number, field: string }[]
}
export interface TotalX {
    level: string
    profession: string
    stack: string[];
}
export interface Tech {
    professionTech?: [{ tech: "", fields: [{ field: "", score: 0 }] }],
    tech?: ""
    // professionTech?: { tech: string, fields: { field: string, score: number }[] }[]
}
export interface Score {
    correctness: number;
    code_quality: number;
    efficiency_depth: number;
    problem_solving: number;
    completeness: number;
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
