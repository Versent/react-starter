defmodule App.Api.LanguagesController do
  use App.Web, :controller

  def index(conn, _params) do
    render conn, model: App.Repo.all(App.Language)
  end
end
