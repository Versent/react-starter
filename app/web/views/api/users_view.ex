defmodule App.Api.UsersView do
  use App.Web, :view
  use JaSerializer.PhoenixView

  def type, do: "user"

  location "/users/:id"

  attributes [:name]

  has_many :language_users, include: App.Api.LanguagesUsersMinView
  has_many :languages, include: App.Api.LanguagesMinView

  def language_users(model, _conn) do
    model.language_users
  end

  def languages(model, _conn) do
    model.languages
  end

end
