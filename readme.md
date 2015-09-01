# React Starter

Starter Application for React SPAs, this kit includes:

- [Babel](https://babeljs.io/)
- [BASSCSS](http://www.basscss.com/) for CSS
- [Font Awesome](https://fortawesome.github.io/Font-Awesome/)
- [JSCS](http://jscs.info/) For JS linting
- [Phoenix](http://www.phoenixframework.org/) as backend
- [React Router](https://github.com/rackt/react-router)
- [React](http://facebook.github.io/react/)
- [Redux devtools](https://github.com/gaearon/redux-devtools)
- [Redux-crud](https://github.com/Versent/redux-crud)
- [Redux](https://github.com/rackt/redux)
- [Seamless-immmutable](https://github.com/rtfeldman/seamless-immutable)
- [Tape](https://github.com/substack/tape) for JS unit tests
- [Webpack dev server](http://webpack.github.io/docs/webpack-dev-server.html)
- [Webpack](http://webpack.github.io/)

## Set up

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

## Running

In ./app

```
mix phoenix.server
```

In ./client

```
npm start
```

Open http://localhost:4002/


Linting
-------

```
gulp lint
```

Unit tests
----------

```
npm test
```

Watch mode:

```
gulp test-watch
```


Running single test:



## TODO:

- Dev using Docker?
- Deployment with Docker
- JS Unit tests
- Flow type checker


