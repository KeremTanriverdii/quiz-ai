import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Blog')
    .items([
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      // S.documentTypeListItem('question').title('Question'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['post', 'category', 'author',
          // 'question'
        ].includes(item.getId()!),
      ),
    ])

export const questionStructure: StructureResolver = (S) =>
  S.list()
    .title('Questions')
    .items([
      S.documentTypeListItem('question').title('Questions'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['question'].includes(item.getId()!),
      ),
    ])


export const userStructure: StructureResolver = (S) =>
  S.list()
    .title('Users')
    .items([
      S.documentTypeListItem('user').title('Users'),
      S.documentTypeListItem('session').title('Session'),
      S.documentTypeListItem('userQuestion').title('User Question'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['user', 'session', 'userQuestion'].includes(item.getId()!),
      ),
    ])

