import gql from "graphql-tag";

export const typeDefs = gql`
  type LocationWeatherType {
    zip: String!
    weather: String!
    tempC: String!
    tempF: String!
    friends: [LocationWeatherType]! # Actualización
  }

  input LocationWeatherInput {
    zip: String!
    weather: String
    tempC: String
    tempF: String
    friends: [String] # Para el input, los amigos siguen siendo representados como cadenas
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
  }
`;
