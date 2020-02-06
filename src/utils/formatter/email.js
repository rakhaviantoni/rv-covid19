export const isEmail = value => {
  let isRight = false
  const emailRegex = /^[a-zA-Z0-9_\.]+@+[a-zA-Z0-9_\.]+(\.[a-zA-Z0-9_\.]+)+$/

  if (value.length > 0) {
    if (emailRegex.test(value)) {
      isRight =  true
    }
  } else {
    isRight = true
  }

  return isRight
}