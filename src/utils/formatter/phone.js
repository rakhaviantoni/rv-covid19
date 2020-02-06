const maxLen = 13
const minLen = 10

export const phoneRegex = /[0-9]/g

export const formatPhone = (phone) => {

  if(phone.match(phoneRegex) !== null){
    phone = phone.match(phoneRegex).join('')
    return phone.length <= maxLen ? phone : phone.substr(0, maxLen)
  }
  
}

export const isPhone = phone => {
  const onlyNumberRegex = /^[0-9]*$/
  const isNumber = onlyNumberRegex.test(phone)
  let isGenuinePhone = false
  if (isNumber && phone.length >= 10 && phone.length <= 13) {
    isGenuinePhone = true
  }
  return isGenuinePhone
}

export const isRegexPhone = value => { // Only numbers are allowed, min 0
  const quantityRegex = /^[0-9]*$/
  let isRight = false
  if ((!Number.isNaN(value) && quantityRegex.test(value)) || value === "") {
    isRight = true
  }
  return isRight
}

export const isValidPhone = (phone) => {

  let response = {
    status: false,
    message: 'Format nomor telepon tidak sesuai!'
  }

  if(phone.length === 0) response.message = 'Mohon isi form nomor telepon!'

  if(phone.length >= minLen && phone.length <= maxLen){
    response.status = true
    response.message = ''
  }

  return response

}
