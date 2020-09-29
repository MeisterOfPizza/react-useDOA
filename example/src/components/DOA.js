import React from 'react'
import Animal from '../Animal'
import useDOA from '../extensions/useDOA'

let startAt = 0;
let endAt   = 0;

const DOA = () => {
    const [animal1, map1] = useDOA(new Animal(0, "Dog", 5));
    const [animal2, map2] = useDOA(new Animal(0, "Bird", 2));

    endAt = performance.now();
    console.log(`DOA render, took ${endAt - startAt} ms`);

    return (
        <div style={{ backgroundColor: "#eee" }}>
            <h3>DOA</h3>
            <p>Increments the dog / cat's id by 1 and the bird / turtle's age by 10. It does this by using DOA, which means ONLY changing the exact fields needed to change (id, name, and age).</p>
            <p>{animal1.display()}</p>
            <p>{animal2.display()}</p>
            <button
                style={{
                    width: 100,
                    height: 25,
                    display: "block"
                }}
                onClick={() => {
                    console.log("clicked DOA");

                    startAt = performance.now();

                    map1.name.set("Cat");
                    map1.id.set(map1.id.get() + 1);
                    map2.name.set("Turtle");
                    map2.age.set(animal2.age + 10);
                }}>
                Click
            </button>
            <p>Clicking this button will increment the dog / cat's age by 1, although not cause a re-render. Try clicking this 1 time and then clicking the button above me to see the dog / cat's age increase by 1 (late update). This can be an effective tool to use if you need to update a class instance's field value inside an internal function without causing a re-render or wanting a loss of data.</p>
            <button
                style={{
                    width: 150,
                    height: 25,
                    display: "block"
                }}
                onClick={() => {
                    console.log("clicked DOA no re-render");

                    animal1.age++;
                }}>
                Click (no re-render)
            </button>
        </div>
    );
}

export default DOA;