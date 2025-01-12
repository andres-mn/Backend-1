//Modulos nativos en Nodejs
//fs crypto http path
//Criptografia de nodeja
import { error } from "console"
import crypto from "crypto"

const algoritmo = "aes-256-ctr"
const clave_secreta = "andres123andres123andres123andre"
const vector_inicializacion = "andresandresandr"

const encrypt = (password) => {
    const cipher = crypto.createCipheriv(algoritmo, clave_secreta, vector_inicializacion)
    const encryptPass = Buffer.concat([cipher.update(password), cipher.final()])

    const passE = encryptPass.toString("hex")
    console.log(passE)
    return passE
}

const decrypt = (encryptedpassword) => {
    const decipher = crypto.createDecipheriv(algoritmo,clave_secreta,vector_inicializacion)
    const decryptPass = Buffer.concat([decipher.update(Buffer.from(encryptedpassword, "hex")), decipher.final()])

    return decryptPass
}

//let password = "andres"

//let encriptada = encrypt(password)

//console.log(decrypt(encriptada));

//import moment from "moment"

//console.log(moment());

//npm -i instala todas las dependencias de un proyecto node
//----------------------------------------------------------------
//fs 1 sincrono 2 asincronico
import fs from "fs"

const ruta = "ejemplo.txt"

//fs.writeFileSync(ruta,"nuevo")
/*
SINCRONICO
if(fs.existsSync(ruta))
{
    let datos = fs.readFileSync(ruta, "utf-8")
    console.log(datos)

    fs.appendFileSync(ruta, " archivo")

    fs.unlinkSync(ruta) //elimibar
}
*/

/*
VIA CALLBACKS
fs.writeFile(ruta, "Hola", (error) => 
{
    if(error)
    {
        console.log("Error en escritura de arvhico")
    }
    fs.readFile(ruta, "utf-8", (error) => 
    {
        if(error)
        {
            console.log("No se puede leer el archivo")
        }
        fs.appendFile(ruta, "Hola", (error) =>
        {
            if(error)
                {
                    console.log("No se agregar leer el archivo")
                }
            fs.unlink(ruta, "Hola", (error) =>
            {
                if(error)
                    {
                        console.log("Error en eliminarrchivo")
                    }
            })
        })
    })
})
*/

//await para asincronas
import fs from "fs/promises"

await fs.writeFile(ruta,"nuevo")

let datos = await fs.readFile(ruta, "utf-8")
console.log(datos)

await fs.appendFile(ruta, " archivo")

await fs.unlink(ruta) //elimibar