import { gql } from "@apollo/client";

export const UPDATE_PERSON = gql`
  mutation($name: String!, $phone: String!, $street: String!,$city: String!) {
    editPerson( name: $name phone: $phone street: $street city: $city ) {
      name 
      phone
      address {
        city
        street
      }
      id
    }
  }
`;

export const CREATE_PERSON = gql`
mutation($name: String!, $phone: String!, $street: String!, $city: String!) {
  addPerson(name: $name, phone: $phone, street: $street, city: $city) {
    name
    phone
    address {
      city
      street
    }
    id
  }
}
`;

export const ALL_PERSONS = gql`
    query {
    allPersons  {
      name
      phone
      id
      address {
        street
        city
      }
    }
    personCount
  }
`;

export const REMOVE_PERSON = gql`
  mutation($name: String!) {
    deletePerson(name: $name) {
      name
      id
    }
  }
`;
