import { GraphQLError } from "graphql";
import { ApolloServer } from "@apollo/server";
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import { typeDefs } from "./gql/schema.ts";
import mongoose from "mongoose"
import { startStandaloneServer } from "@apollo/server/standalone";
import { Mutation } from "./resolvers/mutation.ts";
import { Query } from "./resolvers/query.ts";
const env = await load()
const MONGO_URL = Deno.env.get("MONGO_URL") || env.MONGO_URL;
if (!MONGO_URL) {
  throw new Error("Please provide a MongoDB connection string");
}

// Connect to MongoDB
await mongoose.connect(MONGO_URL);

console.info("🚀 Connected to MongoDB");

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation
  },
});

const { url } = await startStandaloneServer(server, { listen: { port: 3000, }, });
console.log(`🚀 Server ready at ${url}`);