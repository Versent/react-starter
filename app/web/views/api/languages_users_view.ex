defmodule App.Api.LanguagesUsersView do
  use App.Web, :view
  use JaSerializer.PhoenixView

  def type, do: "language_user"

  attributes [:language_id, :user_id]

end
