import axios from "npm:axios";
import { Modelocontacto } from "../db/contactos.ts";
import { contactomostrar } from "../types.ts"
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";


const env = await load()
const api_key = Deno.env.get("api_key") || env.api_key;
if (!api_key) {
  throw new Error("Please provide a api_key");
}
export const Query = {

    getContact: async (_:unknown,
        args:{id:string}
    ):Promise<contactomostrar>=>{
try {
    const contactomongo= await Modelocontacto.findById(args.id)
    if(!contactomongo){
        throw new Error("No se ha encontrado ese contacto")
    }
    const respuesta= await axios.get(`https://api.api-ninjas.com/v1/validatephone?number=${contactomongo?.telefono}`,{
        headers:{
        'X-Api-Key': api_key
        }
        
    })
    const pais=respuesta.data.location;

    const respuestacapital= await axios.get(`https://api.api-ninjas.com/v1/country?name=${pais}`,{
        headers:{
        'X-Api-Key': api_key
        }
        
    })
    const capital= respuestacapital.data.at(0).capital

    const respuestalat= await axios.get(`https://api.api-ninjas.com/v1/city?name=${capital}`,{
        headers:{
        'X-Api-Key': api_key
        }
        
    })
    const lat= respuestalat.data.at(0).latitude
    const long=respuestalat.data.at(0).longitude
    console.log(lat,long)
    const respuestahora= await axios.get(`https://api.api-ninjas.com/v1/worldtime?lat=${lat}&lon=${long}`,{
        headers:{
        'X-Api-Key': api_key
        }
        
    })
console.log("caca")
    const hora = `${respuestahora.data.hour}:${respuestahora.data.minute}:${respuestahora.data.second}`;
    const contacto:contactomostrar={
        id:contactomongo?._id,
        nombre:contactomongo?.nombre,
        telefono:contactomongo?.telefono,
        pais:pais,
        hora:hora,
    }
    return contacto
} catch (error) {
    return new Error(error.message) 
}
 
    },
    getContacts: async ():Promise<contactomostrar[]>=>{
try {
    const contactosmongo= await Modelocontacto.find()
    if(!contactosmongo){
        throw new Error("No se han encontrado contactos")
    }
    const arraymonstrar:contactomostrar[]=[]
    for (let index = 0; index < contactosmongo.length; index++) {
        const respuesta= await axios.get(`https://api.api-ninjas.com/v1/validatephone?number=${contactosmongo?.at(index).telefono}`,{
            headers:{
            'X-Api-Key': api_key
            }
            
        })
        const pais=respuesta.data.location;
    
        const respuestacapital= await axios.get(`https://api.api-ninjas.com/v1/country?name=${pais}`,{
            headers:{
            'X-Api-Key': api_key
            }
            
        })
        const capital= respuestacapital.data.at(0).capital
    
        const respuestalat= await axios.get(`https://api.api-ninjas.com/v1/city?name=${capital}`,{
            headers:{
            'X-Api-Key': api_key
            }
            
        })
        const lat= respuestalat.data.at(0).latitude
        const long=respuestalat.data.at(0).longitude
        console.log(lat,long)
        const respuestahora= await axios.get(`https://api.api-ninjas.com/v1/worldtime?lat=${lat}&lon=${long}`,{
            headers:{
            'X-Api-Key': api_key
            }
            
        })
    console.log("caca")
        const hora = `${respuestahora.data.hour}:${respuestahora.data.minute}:${respuestahora.data.second}`;
        const contacto:contactomostrar={
            id:contactosmongo?.at(index)._id,
            nombre:contactosmongo?.at(index).nombre,
            telefono:contactosmongo?.at(index).telefono,
            pais:pais,
            hora:hora,
        }
        arraymonstrar.push(contacto)

        
    }
    return arraymonstrar
} catch (error) {
    return new Error(error.message) 
}
},
}