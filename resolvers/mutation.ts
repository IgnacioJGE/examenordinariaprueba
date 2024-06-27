import { tipocontacto } from "../db/contactos.ts"
import { Modelocontacto } from "../db/contactos.ts"
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import axios from "npm:axios"

const env = await load()
const api_key = Deno.env.get("api_key") || env.api_key;
if (!api_key) {
  throw new Error("Please provide a api_key");
}
export const Mutation = {

    addContact: async (_: unknown,
        args: { nombre: string, telefono: string }
    ): Promise<tipocontacto> => {
        try {
           const  api_url = `https://api.api-ninjas.com/v1/validatephone?number=${args.telefono}`
          const   response = await axios.get(api_url, {
            headers :
            {'X-Api-Key': api_key}})
            const continua=response.data.is_valid;
            if(continua==false){
                throw new Error("Telefono incorrecto")
            }
            const nuevocontacto = new Modelocontacto({
                nombre: args.nombre,
                telefono: args.telefono
            })
            await nuevocontacto.save();
            return nuevocontacto;
        } catch (error) {
            return new Error(error.message)

        }


    },
    deleteContact: async (_: unknown,
        args: { id:string }
    ): Promise<boolean> => {
        try {

            const contactoeliminar= await Modelocontacto.findByIdAndDelete(args.id)
          
            return true;
        } catch (error) {
            return false;

        }


    },
    
    updateContact: async (_: unknown,
        args: { id:string,nombre: string, telefono: string }
    ): Promise<tipocontacto> => {

try {

    if(!args.telefono&&!args.nombre){
        throw new Error("Error nombre o telefono necesarios")

    }
    if(!args.telefono){
        const nuevocontacto = await Modelocontacto.findByIdAndUpdate(args.id,{nombre:args.nombre})
        return  {
            _id:nuevocontacto?.id,
            nombre:args.nombre,
            telefono:nuevocontacto?.telefono
        }
    }
    if(!args.nombre){
        const  api_url = `https://api.api-ninjas.com/v1/validatephone?number=${args.telefono}`
        const   response = await axios.get(api_url, {
          headers :
          {'X-Api-Key': api_key}})
          const continua=response.data.is_valid;
          if(continua==false){
              throw new Error("Telefono incorrecto")
          }
        const nuevocontacto = await Modelocontacto.findByIdAndUpdate(args.id,{telefono:args.telefono})
        return  {
            _id:nuevocontacto?.id,
            nombre:nuevocontacto?.nombre,
            telefono:args.telefono
        }   
    }
    const  api_url = `https://api.api-ninjas.com/v1/validatephone?number=${args.telefono}`
    const   response = await axios.get(api_url, {
      headers :
      {'X-Api-Key': api_key}})
      const continua=response.data.is_valid;
      if(continua==false){
          throw new Error("Telefono incorrecto")
      }
    const nuevocontacto = await Modelocontacto.findByIdAndUpdate({id:args.id},{nombre:args.nombre,telefono:args.telefono})
    return  {
        _id:nuevocontacto?.id,
        nombre:args.nombre,
        telefono:args.telefono
    };    
} catch (error) {
    return new Error(error.message)
}


    },
}