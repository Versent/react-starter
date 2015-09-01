# React Starter

Starter Application for React SPAs, this kit includes:

- [Babel](https://babeljs.io/)
- [BASSCSS](http://www.basscss.com/) for CSS
- [Font Awesome](https://fortawesome.github.io/Font-Awesome/)
- [Phoenix](http://www.phoenixframework.org/) as backend
- [React Router](https://github.com/rackt/react-router)
- [React](http://facebook.github.io/react/)
- [Redux devtools](https://github.com/gaearon/redux-devtools)
- [Redux-crud](https://github.com/Versent/redux-crud)
- [Redux](https://github.com/rackt/redux)
- [Seamless-immmutable](https://github.com/rtfeldman/seamless-immutable)
- [Webpack](http://webpack.github.io/)
- Webpack dev server
- Unit test

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

TODO

```
make lint
```

Unit tests
----------

TODO

```
make test-unit
```

## TODO:

- Dev using Docker?
- Deployment with Docker
- JS Unit tests
- Flow type checker


