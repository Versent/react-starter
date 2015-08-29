defmodule App.Api.UsersView do
  use App.Web, :view
  use JaSerializer.PhoenixView

  def type, do: "user"

  attributes [:name, :email]

  # def attributes(model) do
  #   Map.take(model, [:username, :created_at])
  # end
end
