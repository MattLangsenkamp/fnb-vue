export async function uploadFile(file, url) {
  fetch(url, {
    method: 'PUT',
    body: file
  })
    .then(() => {
      // If multiple files are uploaded, append upload status on the next line.
      console.log('success')
    })
    .catch(e => {
      console.error(e)
    })
}

export function getMimeType(file) {
  return file.type.substring(6)
}

export function filterProblematicKey(obj, probKey) {
  return Object.keys(obj)
    .filter(key => key !== probKey)
    .reduce((res, key) => ((res[key] = obj[key]), res), {})
}
