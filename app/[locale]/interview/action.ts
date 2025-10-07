'use server'
import { cookies } from 'next/headers'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { client } from '@/sanity/lib/client'

export async function generateQuestion(levelRaw: string, stackRaw: string, langRaw: string) {
  // Data get the cookies
  const cookieStore = await cookies();
  const session = await getServerSession(authOptions);

  // sesssion check
  if (!session?.user?.email) throw new Error('No found user session');
  if (!levelRaw || !stackRaw) throw new Error('You have missing file');

  // extra lang check
  const lang = cookieStore.get('NEXT_LOCALE')?.value || 'en';

  let stackArray: string[] = []
  try {
    const parsed = JSON.parse(stackRaw)
    if (Array.isArray(parsed)) {
      stackArray = parsed.map(t => String(t).toLowerCase())
    } else if (typeof parsed === 'object' && parsed !== null) {
      stackArray = Object.values(parsed).flat().map(t => String(t).toLowerCase())
    }
  } catch {
    console.log('error')
    // stackArray = stackRaw.split(',').map(t => t.trim().toLowerCase())
  }

  // if stackArray empty throw new error
  if (!stackArray.length) throw new Error('No technologies provided for filtering')


  // sanity.io cms query
  const query = `
    *[
      _type == "question" &&
      tech in $stackArray &&
      level == $level &&
      $lang in translations[].lang
    ]{
      _id,
      type,
      tech,
      difficulty,
      "questionText": coalesce(
        translations[lang == $lang][0].text,
        translations[0].text
      ),
      options[]{
        label,
        "optionText": coalesce(
          translations[lang == $lang][0].text,
          translations[0].text
        )
      },
      templates[]{
        "templateCode": coalesce(
          code,
          templates[0].code
        )
      }
    }
  `
  if (!stackArray.length) {
    throw new Error('No techlogies provided for filtering')
  }

  // fetch the data from sanity client 
  const allQuestions = await client.fetch(query,
    {
      stackArray,
      level: levelRaw,
      lang
    })


  if (!allQuestions.length) throw new Error('No questions found for the given filters')

  // Filter to Difficulity
  // const diff1to3 = allQuestions.filter((q: any) => q.difficulty >= 1 && q.difficulty <= 3)
  const diff4 = allQuestions.filter((q: any) => q.difficulty === 4)
  const diff5 = allQuestions.filter((q: any) => q.difficulty === 5)

  // Filter to question type
  const openQuestions = allQuestions.filter((q: any) => q.type === 'open')
  const mvcQuestions = allQuestions.filter((q: any) => q.type === 'mvc')

  // Add at least one diff4 and diff5
  const selectedQuestions: any[] = []
  // stackArray.forEach((tech:any) => {
  //   const techQuestions = allQuestions.filter((q: any) => q.tech.toLowerCase() === tech);
  //   if (techQuestions.length > 0) {
  //     selectedQuestions.push(techQuestions[Math.floor(Math.random() * techQuestions.length)])
  //   }
  // })
  if (diff4.length > 0) selectedQuestions.push(diff4[Math.floor(Math.random() * diff4.length)])
  if (diff5.length > 0) selectedQuestions.push(diff5[Math.floor(Math.random() * diff5.length)])

  // Complete to remaining questions (6 open, 4 mcq)
  const remainingOpen = openQuestions
    .filter((q: any) => !selectedQuestions.some(sel => sel._id === q._id))
    .sort(() => Math.random() - 0.5)
    .slice(0, 6 - selectedQuestions.filter((q: any) => q.type === 'open').length)

  const remainingMvc = mvcQuestions
    .filter((q: any) => !selectedQuestions.some(sel => sel._id === q._id))
    .sort(() => Math.random() - 0.5)
    .slice(0, 4 - selectedQuestions.filter((q: any) => q.type === 'mvc').length)

  selectedQuestions.push(...remainingOpen, ...remainingMvc)


  const questions = selectedQuestions.slice(0, 10);

  // access sanity user
  const sanityUser = await client.fetch(
    `*[_type=='user' && email == $email][0]`
    , { email: session.user.email }
  )

  let userId;
  if (!sanityUser) {
    const createdUser = await client.create({
      _type: 'user',
      name: session.user.name,
      email: session.user.email,
      image: session.user.image
    });
    userId = createdUser._id

  } else {
    userId = sanityUser._id
  }

  // Register UserQuestion
  await client.create({
    _type: 'userQuestion',
    user: {
      _type: 'reference',
      _ref: userId
    },
    questions: questions.map((q) => ({
      _type: 'reference',
      _ref: q._id
    })),
    createdAt: new Date().toISOString()
  })

  return questions
}