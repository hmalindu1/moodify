/* ================================================================================================ /
 * Title : Entry Editor Component
 * Description :
 * Author : Hashan
 * Date : February 17th, 2024
 /* ================================================================================================ */

'use client'

import React from 'react'

const Editor = ({ entry }) => {
  return (
    <div>{entry.content}</div>
  )
}

export default Editor