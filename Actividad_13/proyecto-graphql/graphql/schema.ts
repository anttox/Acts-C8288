import gql from "graphql-tag";

export const typeDefs = gql`
  type LocationWeatherType {
    zip: String!
    weather: String!
    tempC: String!
    tempF: String!
    friends: [LocationWeatherType]! # Actualización: amigos son también de tipo LocationWeatherType
  }

  input LocationWeatherInput {
    zip: String!
    weather: String
    tempC: String
    tempF: String
    friends: [String] # Este input sigue siendo strings porque se usa al crear nuevas ubicaciones
  }

  type User {
    id: ID!
    name: String!
    email: String!
    location: LocationWeatherType
  }

  type Query {
    weather(zip: String): [LocationWeatherType]!
    users: [User]!
  }

  type Mutation {
    weather(data: LocationWeatherInput): [LocationWeatherType]!
    addLocation(data: LocationWeatherInput): [LocationWeatherType]!
  }
`;
