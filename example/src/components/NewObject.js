import React, { useState } from 'react'

let startAt = 0;
let endAt   = 0;

const NewObject = () => {
    const [animal, setAnimal] = useState({ id: 0, name: "Dog", age: 5 });

    endAt = performance.now();
    console.log(`New Object render, took ${endAt - startAt} ms`);

    return (
        <div style={{ backgroundColor: "#eee" }}>
            <h3>New Object</h3>
            <p>Increments the animal's id by 1 and changes its name to "Cat". It does this by cloning (spreading) the last object value and creating a new object with updated values.</p>
            <p>#{animal.id} | {animal.name} is {animal.age} years old</p>
            <button
                style={{
                    width: 100,
                    height: 25,
                    display: "block"
                }}
                onClick={() => {
                    console.log("clicked new object");

                    startAt = performance.now();

                    setAnimal({ ...animal, id: animal.id + 1, name: "Cat" });
                }}>
                Click
            </button>
        </div>
    );
}

export default NewObject;