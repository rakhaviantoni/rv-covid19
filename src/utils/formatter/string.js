export const encodeSlug = (txt, separator) => {
  return txt.split(separator).join('_').toLowerCase()
}

export const decodeSlug = (txt, separator) => {
  return txt.split('_').join(separator).toLowerCase()
}