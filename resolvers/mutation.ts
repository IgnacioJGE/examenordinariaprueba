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


    }
}