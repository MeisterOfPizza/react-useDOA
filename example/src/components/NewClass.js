import React, { useState } from 'react'
import Animal from '../Animal'

let startAt = 0;
let endAt   = 0;

const NewClass = () => {
    const [animal, setAnimal] = useState(new Animal(0, "Dog", 5));

    endAt = performance.now();
    console.log(`New Class render, took ${endAt - startAt} ms`);

    return (
        <div style={{ backgroundColor: "#eee" }}>
            <h3>New Class Instance</h3>
            <p>Increments the animal's id by 1 and changes its name to "Cat". It does this by creating a new Animal class instance and using the same values from before but updated.</p>
            <p>{animal.display()}</p>
            <button
                style={{
                    width: 100,
                    height: 25,
                    display: "block"
                }}
                onClick={() => {
                    console.log("clicked new class");

                    startAt = performance.now();

                    setAnimal(new Animal(animal.id + 1, "Cat", animal.age));
                }}>
                Click
            </button>
        </div>
    );
}

export default NewClass;