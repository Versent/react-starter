defmodule App.LanguageUser do
  use App.Web, :model

  schema "languages_users" do
    belongs_to :user, App.User
    belongs_to :language, App.Language
    timestamps
  end

  @required_fields ~w(language_id user_id)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
