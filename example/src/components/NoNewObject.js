import React, { useState } from 'react'
import Animal from '../Animal'

let startAt = 0;
let endAt   = 0;

const NoNewObject = () => {
    const [animal, setAnimal] = useState(new Animal(0, "Dog", 5));

    endAt = performance.now();
    console.log(`No New Object render, took ${endAt - startAt} ms`);

    return (
        <div style={{ backgroundColor: "#eee" }}>
            <h3>No New Object (this shouldn't change)</h3>
            <p>Increments the animal's id by 1, however, not by assigning a new object to the state but by changing the state value's field (which does not work in React), which is why clicking the button won't change the id.</p>
            <p>{animal.display()}</p>
            <button
                style={{
                    width: 100,
                    height: 25,
                    display: "block"
                }}
                onClick={() => {
                    console.log("clicked no new object");

                    animal.name = "Cat";
                    animal.id++;
                    
                    startAt = performance.now();

                    setAnimal(animal);
                }}>
                Click
            </button>
        </div>
    );
}

export default NoNewObject;