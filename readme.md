# React Starter

Starter Application for React SPAs, this kit includes:

- [Ava](https://github.com/sindresorhus/ava) for JS unit tests
- [Babel](https://babeljs.io/)
- [BASSCSS](http://www.basscss.com/) for CSS
- [Font Awesome](https://fortawesome.github.io/Font-Awesome/)
- [Istanbul](https://github.com/gotwarlost/istanbul)
- [JSCS](http://jscs.info/) For JS linting
- [Phoenix](http://www.phoenixframework.org/) as backend
- [React Router](https://github.com/rackt/react-router)
- [React](http://facebook.github.io/react/)
- [Redux devtools](https://github.com/gaearon/redux-devtools)
- [Redux-crud](https://github.com/Versent/redux-crud)
- [Redux](https://github.com/rackt/redux)
- [Robo](https://github.com/tj/robo) for running tasks
- [Seamless-immmutable](https://github.com/rtfeldman/seamless-immutable)
- [Webpack dev server](http://webpack.github.io/docs/webpack-dev-server.html)
- [Webpack](http://webpack.github.io/)

Set up
-------------------------------------

This project requires Node v4

### Installing dependecies

In ./app

```
mix deps.get
mix ecto.create
mix ecto.migrate
```

In ./client

```
npm install
```

Run
-------------------------------------

In ./app

```
mix phoenix.server
```

In ./client

```
npm start
```

### Both

Or using forego in root

```
brew install forego
forego start
```

Open http://localhost:4002/

Lint
-------------------------------------

Front end linting (in ./client)

```
make lint
```

Test
-------------------------------------

Front end unit tests (in ./client)

```
make test
```

Testing with coverage:

```
make coverage
```

Watch mode:

```
gulp test-watch
```

Running single test:

```
robo test ./src/users/Show.test.js
```

## TODO:

- Test using CI
- Code coverage
- Dev using Docker?
- Deployment with Docker
- Flow type checker (Doesn't work with ES6)


