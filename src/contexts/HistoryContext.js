import React, { createContext, useState } from 'react'
import { getHistory } from "../services/HistoryService"

const HistoryContext = createContext([])

function createHistoryContext() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [histories, setHistories] = useState([])
  function updateHistories() {
    getHistory()
      .then((result) => setHistories(result.data))
      .catch(console.log)
  }
  return [histories, updateHistories]
}
export {
  createHistoryContext,
  HistoryContext,
}
export default HistoryContext
