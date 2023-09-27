# Code-First

## Run

Run: `docker-compose up`

## Note

This is **intentionally over-engineered**. The goal was to learn and practise DDD concepts.

The assumption is that this approach means ...

- the complexity is too high for a small project like this with only a few endpoints, but ...
- the complexity is essential for a larger project with many endpoints, but the scalability will be constant and the complexity will increase linearly and not exponentially the more endpoints are added

## Use cases

This project implements the following use cases:

- Create a user ✅
- Get a user ⏳
- Edit a user ⏳

## Artefact Responsibilities

In this project, we implement certain Domain-Driven Design (DDD) concepts as specific code artefacts, with each file named after its corresponding artefact and holding a distinct responsibility. The following artefacts and their responsibilities are used:

- **Repository**: persist and retrieve entity objects to/from a data store (e.g. database), via an ORM if necessary
- **Entity**: represent a domain object with a unique identity
- **DTO**: data transfer object, describing: the shape taken by data in requests from the client and validation rules applying to it; and the shape taken by data in responses to the client
- **Controller**: handle incoming HTTP request, parse the attached DTO and map to appropriate Command/Query object, pass on to appropriate use case, and return the response to the client
- **Use Case**: handle the commands and queries received from the client, and return the appropriate response
- **Command**: defines a request to change the state of the system and, if applicable, the data required to do so
- **Query**: defines a request to retrieve data from the system and, if applicable, the data required to do so

The following concepts have not been implemented, but could have been interesting to use:

- Events

## Interface

Several artefacts are co-located with an interface. The idea is to separate the interface from the implementation, so that the interface can be used to define the contract between the artefact and its dependencies, and the implementation can be changed without affecting the interface. This is useful for testing, as it allows us to mock the dependencies of an artefact.

## Root dependency injection blabla

We use the blabla blabla bla

## Inspiration

- https://github.com/Sairyss/domain-driven-hexagon
- Various conversations with ChatGPT
- Study buddy: https://github.com/realraif/the-software-essentialist
