/* ================================================================================================ /
 * Title : Function to call the Create Journal API
 * Description : This will get the user through middleware and create a journal 
 * Author : Hashan
 * Date : February 17th, 2024
 /* ================================================================================================ */

/***
 * To pass the full path URLs to the fetch API, this function will create a dynamic url, wether we are on the localhost or on the production
 */
export const createURL = (path) => {
  return window.location.origin + path
}

export const createNewEntry = async () => {
  const res = await fetch(
    new Request(createURL('/api/journal'), {
      method: 'POST',
    })
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}
