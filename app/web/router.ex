defmodule App.Router do
  use App.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    # plug CORSPlug
  end

  pipeline :api do

    # plug CORSPlug
    # plug PlugCors, origins: ["*"]
    # plug :accepts, ["json"]
    plug :accepts, ["json-api"]
    plug PlugCors, origins: ["*"], methods: ["GET", "POST", "DELETE", "PATCH", "OPTIONS"], headers: ["Authorization"]
    # plug JaSerializer.ContentTypeNegotiation
  end

  scope "/", App do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api", App.Api do
    pipe_through :api

    resources "/languages", LanguagesController
    options   "/languages", LanguagesController, :options
    options   "/languages/:id", LanguagesController, :options

    resources "/languages_users", LanguagesUsersController
    options   "/languages_users", LanguagesUsersController, :options
    options   "/languages_users/:id", LanguagesUsersController, :options

    resources "/users", UsersController
    options   "/users", UsersController, :options
    options   "/users/:id", UsersController, :options

  end
end
