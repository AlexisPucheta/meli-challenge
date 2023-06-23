
# MELI CHALLENGE

Coding challenge para la posicion de FE developer en la compania Mercado Libre.


## Appendix

Este repositorio se trata de un monorepo, donde convive el Front end y el back end.


## Authors

- [@AlexisPucheta](https://www.github.com/AlexisPucheta)


## Installation

Al tratarse de un monorepo, los node_modules se intalaran en el root, tanto para el proyecto client como server.

```bash
  npm install
```
    
## Deployment

Para correr tanto el client como el servidor basta con el siguiente script

```bash
  npm run start
```

Si quisieramos correr solo el cliente.

```bash
  cd client
  npm run dev
```

Si quisieramos correr solo el server.

```bash
  cd server
  npm run dev
```
## Documentation
This documentation provides an overview of the approach used to solve the coding challenge.

### Project Structure
Given the requirement to develop both a server and a client, a monorepo structure was chosen for its practicality in integrating and reviewing their functionality. While the dependencies and devDependencies in this example were not extensive, utilizing a monorepo allows for the sharing of dependencies between repositories, which is particularly advantageous in larger projects.

### Server
After setting up the project, the server was created by consuming the available Mercado Libre (ML) APIs. A simple structure with routers and controllers was implemented. This server served as the data source for fetching information from the front-end.

### Front-End
Next.js was chosen as the framework for the front-end to take advantage of server-side rendering (SSR), as one of the considerations was SEO. Using SSR helps improve search engine visibility and performance.

Tailwind CSS was selected over Sass since Tailwind is integrated with Next.js, and the problem at hand did not require the use of a CSS preprocessor. The styles were relatively simple, focusing on the desktop view.

### Front-End Implementation
The front-end implementation began with the creation of routes: '/', '/items', and '/items/:id', with the last one being dynamic. The necessary components were developed, such as the layout, shared components like SearchBar, Cards, and Breadcrumbs. Placeholder/mock data was used during this phase.

### Data Management
A context was implemented to manage data throughout the application. This context facilitated the consumption of item data fetched from the server in various components.

Please note that this is a summary of the approach taken to solve the coding challenge. If you have any further questions or require additional information, please feel free to contact me.