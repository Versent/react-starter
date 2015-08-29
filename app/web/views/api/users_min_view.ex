defmodule App.Api.UsersMinView do
  use App.Web, :view
  use JaSerializer.PhoenixView

  def type, do: "user"

  location "/users/:id"

  attributes [:name, :email]


end
