# Prototype Strapi App

This is a prototype to demonstrate a Jamstack architecture with Strapi, Gatsby and Tailwind

## Requirements

- Node
- Gatsby
- Yarn
- Docker

## How to start

1. `make setup` installs dependencies
2. `make backend` starts Strapi. It's available at `http://localhost:1337`
3. `make db-load` to load the current db dump
4. `make dev` to start the development server
5. Gastby's GraphQL Explorer runs at `http://localhost:8000/___graphql` and the page is available at `http://localhost:8000/`

## Production environment

1. `make build-prod` creates a production docker image of the page
2. `make serve-prod` serves your page at `localhost:80`

## FAQ

- If you change anything in Strapi's Content Builder you need to restart the Gatsby development server.
- If you change anything in the `gatsby-node.js` you need to restart the development server.
- To stop the database run `make stop` in the root directory
- Run `make logs` in the root directory to see Strapi's logs
- Run `make db-dump` to create a new strapi db dump
- Any error when running `gatsby develop`? Try `gatsby clean`
