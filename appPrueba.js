class Contador{
    static cuentaGlobal = 10

    constructor(contador){
        this.contador = contador
        this.cuentaIndividual = 1
        Contador.cuentaGlobal++
    }
    getContador(){
        return this.contador
    }
    contar(){
        this.cuentaIndividual++
        Contador.cuentaGlobal++
    }
    getCuentaIndividual(){
        return this.cuentaIndividual
    }
    getCuentaGlobal(){
        return Contador.cuentaGlobal
    }
}

const contador1 = new Contador("Pedro")
const contador2 = new Contador("Andres")

console.log(contador1.getCuentaGlobal())
contador1.contar()
console.log(contador1.getCuentaGlobal())
console.log(contador1.getCuentaIndividual())
console.log(contador2.getCuentaIndividual())
console.log(contador1.getContador())



