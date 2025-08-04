export type StackItem =
    | {
        name: string;
        type: "single" | "multi";
        options?: string[];
    }

export interface Profession {
    id: string;
    name: string;
    stack: StackItem[];
}

const profess: Profession[] = [
    {
        id: 'frontend',
        name: 'Frontend Developer',
        stack: [
            { name: 'HTML', type: 'single' },
            { name: 'CSS', type: 'single' },
            { name: 'JavaScript', type: 'single' },
            { name: 'Framework', options: ['React', 'Vue.js', 'Angular'], type: 'single' },
            { name: 'CSS Library', options: ['Tailwind CSS', 'Bootstrap', 'Sass'], type: 'multi' },
            { name: 'TypeScript', type: 'single' },
            { name: 'Server Side Framework', options: ['Next.js', 'Nuxt.js'], type: 'single' },
            { name: 'Bundler', options: ['Webpack', 'Vite'], type: 'single' },
            { name: 'Testing Tools', options: ['Jest', 'Cypress'], type: 'multi' },
            { name: 'Deployment', options: ['Vercel', 'Netlify'], type: 'single' }
        ]
    },
    {
        id: 'backend',
        name: 'Backend Developer',
        stack: [
            { name: 'Runtime', options: ['Node.js', 'Express.js'], type: 'multi' },
            { name: 'Languages/Frameworks', options: ['Python (Django, Flask)', 'Ruby on Rails', 'Java (Spring Boot)', 'C# (ASP.NET Core)'], type: 'multi' },
            { name: 'PHP Framework', options: ['Laravel', 'Symfony'], type: 'single' },
            { name: 'Database', options: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis'], type: 'multi' },
            { name: 'Auth', options: ['JWT', 'OAuth'], type: 'multi' },
            { name: 'API Type', options: ['REST', 'GraphQL'], type: 'multi' },
            { name: 'Container', options: ['Docker', 'Kubernetes'], type: 'multi' }
        ]
    },
    {
        id: 'mobile',
        name: 'Mobile Developer',
        stack: [
            { name: 'Frameworks', options: ['React Native', 'Flutter'], type: 'single' },
            { name: 'Languages', options: ['JavaScript', 'TypeScript', 'Swift'], type: 'multi' },
            { name: 'State/Database', options: ['Firebase', 'Expo', 'Realm', 'SQLite'], type: 'multi' }
        ]
    },
    {
        id: 'data',
        name: 'Data Scientist / AI & ML Engineer',
        stack: [
            { name: 'Languages', options: ['Python', 'SQL', 'R'], type: 'multi' },
            { name: 'Libraries', options: ['Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'PyTorch'], type: 'multi' },
            { name: 'Tools', options: ['Jupyter Notebook', 'Hadoop', 'Spark', 'Docker', 'MLflow'], type: 'multi' },
            { name: 'Cloud Platform', options: ['AWS Sagemaker', 'GCP AI Platform'], type: 'single' }
        ]
    },
    {
        id: 'devops',
        name: 'DevOps / SRE',
        stack: [
            { name: 'CI/CD', options: ['GitHub Actions', 'Jenkins', 'GitLab CI'], type: 'multi' },
            { name: 'Container', options: ['Docker', 'Kubernetes'], type: 'multi' },
            { name: 'IaC', options: ['Terraform', 'Ansible'], type: 'multi' },
            { name: 'Cloud Providers', options: ['AWS', 'Azure', 'Google Cloud'], type: 'multi' },
            { name: 'Monitoring', options: ['Prometheus', 'Grafana', 'ELK Stack'], type: 'multi' },
            { name: 'Scripting', options: ['Bash', 'Python'], type: 'multi' }
        ]
    },
    {
        id: 'ui',
        name: 'UI/UX Designer',
        stack: [
            { name: 'Design Tools', options: ['Figma', 'Adobe XD', 'Sketch'], type: 'multi' },
            { name: 'No-Code / Handoff', options: ['Webflow', 'Zeplin'], type: 'multi' },
            { name: 'Planning Tools', options: ['Notion', 'Miro', 'FigJam'], type: 'multi' }
        ]
    },
    {
        id: 'shopifydev',
        name: 'E-Commerce / Shopify Developer',
        stack: [
            { name: 'Platforms', options: ['Shopify', 'Shopify Liquid'], type: 'multi' },
            { name: 'Frontend Tools', options: ['JavaScript', 'React', 'Next.js'], type: 'multi' },
            { name: 'CMS', options: ['Sanity', 'Contentful'], type: 'multi' },
            { name: 'Payment', options: ['Stripe', 'PayPal API'], type: 'multi' },
            { name: 'Database', options: ['Firebase', 'Supabase'], type: 'multi' },
            { name: 'Styling', options: ['TailwindCSS'], type: 'single' }
        ]
    },
    {
        id: 'fullstack',
        name: 'Fullstack Developer',
        stack: [
            { name: 'Frontend', options: ['React', 'Next.js'], type: 'multi' },
            { name: 'Backend', options: ['Node.js', 'Express.js'], type: 'multi' },
            { name: 'ORM/Database', options: ['Prisma', 'MongoDB', 'PostgreSQL'], type: 'multi' },
            { name: 'API', options: ['GraphQL', 'REST API'], type: 'multi' },
            { name: 'Auth', options: ['NextAuth.js', 'Clerk', 'Firebase Auth'], type: 'multi' },
            { name: 'Deployment', options: ['Docker', 'Vercel', 'Netlify'], type: 'multi' }
        ]
    },
    {
        id: 'bi',
        name: 'BI / Data Analyst',
        stack: [
            { name: 'Languages', options: ['SQL', 'Python'], type: 'multi' },
            { name: 'Spreadsheets', options: ['Excel', 'Google Sheets'], type: 'multi' },
            { name: 'Visualization Tools', options: ['Power BI', 'Tableau', 'Looker'], type: 'multi' },
            { name: 'ETL Tools', options: ['Apache Airflow', 'Talend'], type: 'multi' }
        ]
    },
    {
        id: 'cyber',
        name: 'Cybersecurity Specialist',
        stack: [
            { name: 'Penetration Tools', options: ['Kali Linux', 'Metasploit', 'Nmap', 'Burp Suite'], type: 'multi' },
            { name: 'Languages', options: ['Python', 'Bash'], type: 'multi' },
            { name: 'Security Tools', options: ['OWASP ZAP', 'Nessus'], type: 'multi' },
            { name: 'SIEM Systems', options: ['Splunk', 'ELK'], type: 'multi' },
            { name: 'Packet Analyzer', options: ['Wireshark'], type: 'single' }
        ]
    }
]

export { profess }
