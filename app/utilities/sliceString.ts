interface iSliceStringTypes {
  text: string
  length: number
}

export function sliceString({ text, length }: iSliceStringTypes) {
  if (text.length > length) {
    return text.slice(0, length) + '...'
  } else {
    return text
  }
}
