
import en from '../dictionaries/en/q2.json'
import de from '../dictionaries/de/q2.json'
import hi from '../dictionaries/hi/q2.json'
import zh from '../dictionaries/zh/q2.json'
import fr from '../dictionaries/fr/q2.json'
import tr from '../dictionaries/tr/q2.json'

const dictionaries = { en, de, hi, zh, fr, tr }

const localeMap: Record<string, keyof typeof dictionaries> = {
    'en': 'en',
    'en-US': 'en',
    'tr': 'tr',
    'de': 'de',
    'hi': 'hi',
    'zh': 'zh',
    'fr': 'fr'
}


// console.log(import('../dictionaries/en/q2.json'))
export const getDictionary = async (locale: string) => {
    const key = localeMap[locale] || 'en' // fallback default
    return dictionaries[key]
}