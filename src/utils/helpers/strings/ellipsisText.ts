export const ellipsisText = (
  text: string,
  maxCount: number,
  separator?: string
) => {
  if (text.length < maxCount) {
    return text
  }
  if (!separator) {
    return `${text.slice(0, maxCount)}...`
  }

  const replaceChars = '...'
  const replaceCharsLength = replaceChars.length
  const splittedTextArray = text.split(separator)
  const tail = splittedTextArray.pop()
  const mainText = splittedTextArray.join()
  const tailLength = tail?.length || 0 + replaceCharsLength + separator.length

  const extraChars = text.length - maxCount
  const endIndex =
    extraChars < replaceCharsLength
      ? mainText.length - replaceCharsLength - extraChars
      : maxCount - tailLength

  return `${mainText.substring(0, endIndex)}${replaceChars}${separator}${tail}`
}