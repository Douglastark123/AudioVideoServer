const isValidFileType = (mimetype: string): boolean => {
  const allowedTypes = ['video/', 'audio/']
  const fileType = mimetype.slice(0, mimetype.indexOf('/') + 1)

  return allowedTypes.includes(fileType)
}

export default isValidFileType
