
export const typeDefs = `#graphql
type Contacto{
    nombre:String!
    telefono:String!
}
type Query{
    getContact(id:ID!):Contacto!
    getContacts:[Contacto!]!
}
type Mutation{
    addContact(nombre:String!,telefono:String!):Contacto!
    deleteContact(id:ID!):Boolean!
    updateContact(id:ID!,nombre:String,telefono:String):Contacto
}
`