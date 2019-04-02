
export default (state, ownProps) => {
  const from = ownProps.from
  const to = ownProps.to

  const copies = Object.keys(state.copies).map(k => {
    return {
      key: k,
      description: state.copies[k].description,
      from: state.copies[k].langs[from],
      to: state.copies[k].langs[to]
    }
  })

  const {[from]: fromLang, [to]: toLang} = state.languages

  return {
    fromLangId: from,
    toLangId: to,
    copies,
    languages: {
      from: fromLang,
      to: toLang
    }
  }
}
