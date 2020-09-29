import React, { useState } from 'react'

const SetStateLoop = () => {
    const [version, setVersion] = useState(0);

    console.log("render set state loop");

    return (
        <div style={{ backgroundColor: "#eee" }}>
            <h3>Set State Loop</h3>
            <p>Uses React's setState 100 times in a row to prove that there's only 1 effective re-render. <b>This means that even if you call DOA's field setter multiple times in a row, only 1 effective re-render will take place.</b></p>
            <button
                style={{
                    width: 100,
                    height: 25,
                    display: "block"
                }}
                onClick={() => {
                    let _version = version + 1;
                    for (let i = 0; i < 100; i++) {
                        setVersion(_version + 1);
                    }
                }}>
                Click
            </button>
        </div>
    );
}

export default SetStateLoop;