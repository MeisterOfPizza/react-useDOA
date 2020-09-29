class Animal {
    constructor(id, name, age) {
        this.id   = id;
        this.name = name;
        this.age  = age;
    }

    display() {
        return `#${this.id} | ${this.name} is ${this.age} years old`;
    }
}

export default Animal;