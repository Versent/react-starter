defmodule App.Api.LanguagesView do
  use App.Web, :view
  use JaSerializer.PhoenixView

  def type, do: "language"

  attributes [:name]


   has_many :language_users, include: App.Api.LanguagesUsersMinView
  has_many :users, include: App.Api.UsersMinView

  def language_users(model, _conn) do
    model.language_users
  end

  def users(model, _conn) do
    model.users
  end

end
