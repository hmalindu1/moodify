/* ================================================================================================ /
 * Title : Question Component
 * Description : Contains the form that submit the question
 * Author : Hashan
 * Date : February 27th, 2024
 /* ================================================================================================ */

'use client'

import { askQuestion } from '@/utils/api'
import { useState } from 'react'

/**
 * Handles the form submission for asking a question.
 *
 * @param {Event} e - The form submission event.
 * @return {void} 
 */
const Question = () => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState(null)
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent the default form submission behavior which refreshes the page.

    setLoading(true) // Set the loading state to true to indicate that the question submission is in progress.

    const { data } = await askQuestion(question) // Call the askQuestion utility function with the current question and wait for the response.

    setAnswer(data) // Update the answer state with the data received from the askQuestion call.

    setLoading(false) // Set the loading state to false as the question submission has completed.

    setQuestion('') // Reset the question input field to an empty string.
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border border-gray-300 rounded-md p-2 text-lg"
          disabled={loading}
          placeholder="Ask a question..."
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-400 px-4 py-2 rounded-md"
        >
          Ask
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {answer && <p className="my-4 text-xl">{answer}</p>}
    </div>
  )
}

export default Question
