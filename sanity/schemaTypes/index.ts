import { type SchemaTypeDefinition } from 'sanity'

import { questionsType } from './questions'
import { userType } from './userType'
import { userQuestion } from './userQuestion'
import { sessionType } from './sessionType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [questionsType, userType, userQuestion, sessionType],
}
