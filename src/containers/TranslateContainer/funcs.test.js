
import sum from './funcs'

test('adds 1 + 2 to equal 3', () => {
  expect(sum({
    copies: {
      hello: {
        description: 'The description',
        langs: {
          lang1: 'FROM COPY',
          lang2: 'TO COPY',
          lang3: 'IGNORE COPY'
        }
      }
    },
    languages: {
      lang1: {description: 'lang 1 description'},
      lang2: {description: 'lang 2 description'},
      lang3: {description: 'lang 3 description'}
    }
  }, {
    from: 'lang1',
    to: 'lang2'
  })).toEqual({
    fromLangId: 'lang1',
    toLangId: 'lang2',
    copies: [
      {
        key: 'hello',
        description: 'The description',
        from: 'FROM COPY',
        to: 'TO COPY'
      }
    ],
    languages: {
      from: {description: 'lang 1 description'},
      to: {description: 'lang 2 description'}
    }
  })
})
