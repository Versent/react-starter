defmodule App.Api.LanguagesView do
  use App.Web, :view
  use JaSerializer.PhoenixView

  def type, do: "language"

  attributes [:name]

  # def attributes(model) do
  #   Map.take(model, [:username, :created_at])
  # end
end
