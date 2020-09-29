import React from 'react'
import DOA from './components/DOA'
import NewClass from './components/NewClass'
import NewObject from './components/NewObject'
import NoNewObject from './components/NoNewObject'
import SetStateLoop from './components/SetStateLoop'

const App = () => {
    return (
        <div
            style={{
                margin: 25
            }}>
            <h1>Examples (+ DOA)</h1>
            <p><b>This app shows different ways of changing an object / class instance's fields AND the DOA way of doing it.</b></p>
            <p>Every example (excluding the Set State Loop test) prints its completion (render) time to the console.</p>
            <NoNewObject />
            <NewObject />
            <NewClass />
            <DOA />
            <SetStateLoop />
        </div>
    );
}

export default App;