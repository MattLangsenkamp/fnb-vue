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
