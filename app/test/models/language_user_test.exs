defmodule App.LanguageUserTest do
  use App.ModelCase

  alias App.LanguageUser

  @valid_attrs %{language_id: 42, user_id: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = LanguageUser.changeset(%LanguageUser{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = LanguageUser.changeset(%LanguageUser{}, @invalid_attrs)
    refute changeset.valid?
  end
end
