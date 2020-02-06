export const isQuantity = value => { // Only numbers are allowed, min 1
  let isRight = false
  const quantityRegex = /^(1|[1-9][0-9]*)$/
  if ((!Number.isNaN(value) && quantityRegex.test(value)) || value === "") {
    isRight = true
  }
  return isRight
}

export const isQuantityBAP = value => { // Only numbers are allowed, min 0
  let isRight = false
  const quantityRegex = /^(0|[1-9][0-9]*)$/
  if ((!Number.isNaN(value) && quantityRegex.test(value)) || value === "") {
    isRight = true
  }
  return isRight
}