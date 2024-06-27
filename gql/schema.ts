
export const typeDefs = `#graphql
type Contacto{
    nombre:String!
    telefono:String!
}
type Contactomostrar{
    id:ID!
    nombre:String!
    telefono:String!
    pais:String!
    hora:String!
}
type Query{
    getContact(id:ID!):Contactomostrar!
    getContacts:[Contactomostrar!]!
}
type Mutation{
    addContact(nombre:String!,telefono:String!):Contacto!
    deleteContact(id:ID!):Boolean!
    updateContact(id:ID!,nombre:String,telefono:String):Contacto
}
`