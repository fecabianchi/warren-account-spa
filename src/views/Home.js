import UserStats from "../components/UserStats"
import History from "../components/History"
import React from "react"
import HistoryContext, {createHistoryContext} from "../contexts/HistoryContext"


function Home() {
    const history = createHistoryContext()

    return <>
        <HistoryContext.Provider value={history}>
            <UserStats/>
            <History/>
        </HistoryContext.Provider>
    </>
}

export default Home
