//Map es un método que devuelve un array

const valoresBase = [1,2,3,4,5]

let nuevos = valoresBase.map((elemento, indice) => elemento**indice)

console.log(nuevos)

console.log(valoresBase.includes(2))

//Async await es una forma más linda de escribir promesas
//en POO propiedad/atributo : value
//Object.entries(clase) retorna un array de arrays de key:value

//ESMAC 9
//callback dentro de un método = funcion pasada por parametro

const precios = [1,110,20]

console.log(precios.reduce((elemento, total)=> total+= elemento, 0))

//destructuración

//const {propiedad1, propiedad2} = objeto1
//spread copia solo las propiedades de un objeto ...object1

//ESMAC 10
class Operaciones {
    sumar = (a,b) => a + b
    restar = (a,b) => a - b
}

//export default class -> type module 

//module.exports = Operaciones // -> command js

//import operaciones from "./"

//ESMAC 11

let cadena1 = "   hola, saludos"
console.log(cadena1.trim()) //elimina espacios inicio y final

console.log([1,2,3,[4,5,6],7,8,9].flat(1)) //profundidad 1

//la promesa resuelve pero la respuesta es asincrona
setTimeout()