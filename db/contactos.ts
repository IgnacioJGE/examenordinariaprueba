import mongoose from "mongoose"
import { contacto } from "../types.ts"



const Schema = mongoose.Schema

const schemaContacto = new Schema({
    nombre: { type: String, required: true },
    telefono: { type: String, rquired: true },

}, { timestamps: true }
)


export type tipocontacto = mongoose.Document & (contacto)

schemaContacto.pre("save",async function (next) {
    const contactos= await mongoose.models.Contactos.findOne({telefono:this.telefono})
    if(contactos){
        return next(new Error("El numero de felefono ya existe"))
    }
        next();
        
    })

export const Modelocontacto = mongoose.model<tipocontacto>("Contactos", schemaContacto)
