// app/interview/[professionSlug]/[levelSlug]/page.tsx

import RadioButtonQuestions from "@/app/components/questionInputs/RadioButtonQuestions";

// Bu bir Server Component.
// 'use client' direktifine gerek yok çünkü API çağrısı ve initial render sunucuda gerçekleşecek.
interface Question {
    id: string; // Soruyu benzersiz tanımlamak için
    text: string;
    options: string[]; // 4 şıklı cevap
    hint: string;
    correctAnswerIndex: number; // Doğru şıkkın index'i (0'dan 3'e)
}

interface GenerateQuestionsResponse {
    questions: Question[];
}

interface InterviewPageProps {
    params: {
        professionSlug: string;
        levelSlug: string;
    };
}

async function getGeneratedQuestions(
    profession: string,
    level: string
): Promise<GenerateQuestionsResponse> {
    const GENERATE_API_URL = process.env.NEXT_PUBLIC_SITE_URL + "/api/generate"

    try {
        const res = await fetch(GENERATE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputValue: profession, level }),
            cache: 'no-store',
        });

        if (!res.ok) {
            console.error('AI Generate API Error:', await res.text());
            return { questions: [] };
        }

        const data = await res.json();
        // console.log("✅ AI'dan gelen veri:", data);

        // Burada doğru alanı kontrol ediyoruz
        if (!Array.isArray(data.questions)) {
            console.warn("❗ 'questions' alanı geçersiz:", data.questions);
            return { questions: [] };
        }

        return { questions: data.questions };

    } catch (error) {
        console.error('❌ Soru çekme sırasında hata oluştu:', error);
        return { questions: [] };
    }
}


export default async function InterviewPage({ params }: InterviewPageProps) {
    const professionSlug = params.professionSlug;
    const levelSlug = params.levelSlug

    // AI'dan soruları generate et
    const { questions } = await getGeneratedQuestions(professionSlug, levelSlug);

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h1>{decodeURIComponent(professionSlug)} Mülakatı - Seviye: {decodeURIComponent(levelSlug)}</h1>
            <p style={{ fontSize: '1.1em', color: '#555' }}>Aşağıdaki soruları dikkatlice cevaplayın:</p>

            {/* Soruları listele */}
            {questions.map((question, qIndex) => (
                <div key={question.id} style={{ marginBottom: '30px', padding: '20px', border: '1px solid #eee', borderRadius: '6px', backgroundColor: '#f9f9f9' }}>
                    <h2 style={{ color: '#333', marginBottom: '15px' }}>
                        Soru {qIndex + 1}: {question.text}
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <RadioButtonQuestions options={question.options} questionId={question.id} />
                    </div>
                </div>
            ))}

            {/* Kullanıcı cevaplarını göndermek için buton */}
            <button
                // Bu butonu da bir Client Component içine almamız gerekecek
                // Çünkü tıklama olayı ve form gönderme işlemleri client tarafında gerçekleşir.
                style={{ marginTop: '30px', padding: '15px 30px', fontSize: '1.2em', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                Mülakatı Bitir ve Puanla
            </button>
        </div>
    );
}