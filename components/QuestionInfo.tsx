"use client"
import React, { useEffect, useState } from 'react'

export default function QuestionInfo() {
    const [meta, setMeta] = useState<any>()
    useEffect(() => {
        const m = sessionStorage.getItem("meta")
        if (m) setMeta(JSON.parse(m))
    }, [])
    return (
        <div className='text-sm text-gray-500 mb-2 flex flex-col gap-3'>
            <p>{meta?.profession} - {meta?.level.slice(0, 1).toUpperCase() + meta?.level.slice(1)} için <br /> mülakat projesi yapay zekadan soruları aldı ve hazırlık yaptırıldı.</p>
            <p><span className='text-red-600'>Uyarı:</span> Her ipucu aldığınızda alacağanız puan üzerinden düşürülecektir ve <br /> süreniz bitince mülakat simülasyonu otomatik olarak sonlandırılacaktır.</p>
            <p><span className='font-bold'>Bilgilendirme:</span> Puanlandırma sistemi süre bazından hesaplanmamaktadır. <br />Sadece süre içinde cevap verilmeyen sorulardan puan hesaplanması olacaktır.</p>
        </div>
    )
}
