/* ================================================================================================ /
 * Title : Function to call the Create Journal API
 * Description : This will get the user through middleware and create a journal 
 * Author : Hashan
 * Date : February 17th, 2024
 /* ================================================================================================ */

/***
 * To pass the full path URLs to the fetch API, this function will create a dynamic url, wether we are on the localhost or on the production
 */
const createURL = (path) => {
  return window.location.origin + path
}

export const updateEntry = async (id, content) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    })
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
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

/**
 * Sends a question to the server and returns the server's response.
 * 
 * @param {string} question - The question to be sent to the server.
 * @returns {Promise<any>} - A promise that resolves with the server's response.
 */
export const askQuestion = async (question: string): Promise<any> => {
  // Construct a Request object with the URL to the API endpoint for questions
  // and set the method to 'POST' with the question included in the body as JSON.
  const request = new Request(createURL(`/api/question`), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Indicate that the request body is JSON
    },
    body: JSON.stringify({ question }), // Convert the question object to a JSON string
  });

  // Send the request to the server using the fetch API.
  const res = await fetch(request);

  // Check if the response status is 'OK' (status in the range 200-299).
  if (res.ok) {
    // If the response is OK, parse the response body as JSON and return it.
    return res.json();
  } else {
    // If the response is not OK, throw an error indicating server issues.
    throw new Error('Something went wrong on API server!');
  }
}
