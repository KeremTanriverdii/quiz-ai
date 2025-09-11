import ContactUsForm from '@/components/blocks/form/ContactUsForm'
import { Brain, Code, Hexagon } from 'lucide-react';
import React from 'react'
import { getDictionary } from '../dictionaries';


// Örnek: type IconProps = {};
// Bu örnekte, ikonların basit SVG elemanları olduğunu varsayıyoruz.

// CircleWithIcon bileşeninin prop tiplerini tanımlıyoruz
interface CircleWithIconProps {
    stroke: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    cx: number;
    cy: number;
    strokeDasharray?: string;
}

const CircleWithIcon: React.FC<CircleWithIconProps> = ({
    stroke,
    icon: Icon,
    cx,
    cy,
    strokeDasharray,
}) => (
    <>
        <circle
            cx={cx}
            cy={cy}
            r={16}
            stroke={stroke}
            strokeDasharray={strokeDasharray}
            fill="none"
            strokeWidth={0.3}
        />
        <g transform={`translate(${cx - 6}, ${cy - 6.7}) scale(0.5)`}>
            <Icon fill='' />
        </g>
    </>
);



export default async function page({ params, }: { params: Promise<{ locale: 'en' | 'tr' | 'fr' | 'de' | 'hi' | 'zh' }> }) {
    const { locale } = await params
    const dict = await getDictionary(locale);
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 h-[80vh] p-2'>
                <div>
                    <h2 className='text-2xl md:text-4xl text-center font-bold'>Al Interview Prep <br />for Developers</h2>
                    <div className="h-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 25" className="w-full h-full ">

                            <CircleWithIcon
                                cx={21}
                                cy={12.5}
                                stroke="#b388ff"
                                icon={Brain}
                            />
                            <CircleWithIcon
                                cx={51}
                                cy={12.5}
                                stroke="#448aff"
                                // strokeDasharray="0.8"
                                icon={Hexagon} // Görselinize benzer bir petek ikonu
                            />
                            <CircleWithIcon
                                cx={81}
                                cy={12.5}
                                stroke="#e040fb"
                                icon={Code}
                            />

                        </svg>
                    </div>
                </div>

                <div>
                    <h2 className='text-4xl'>Contact us</h2>
                    <ContactUsForm url={locale} />
                </div>
            </div>

        </>
    )
}
