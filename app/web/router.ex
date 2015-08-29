defmodule App.Router do
  use App.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    # plug :accepts, ["json"]
    plug :accepts, ["json-api"]
    # plug JaSerializer.ContentTypeNegotiation
  end

  scope "/", App do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api", App.Api do
    pipe_through :api
    resources "/users", UsersController
    resources "/languages", LanguagesController
  end
end
