defmodule App.Api.LanguagesMinView do
  use App.Web, :view
  use JaSerializer.PhoenixView

  def type, do: "language"

  attributes [:name]

end
