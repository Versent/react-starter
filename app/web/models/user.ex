defmodule App.User do
  use App.Web, :model

  schema "users" do
    field :name, :string

    has_many :language_users, App.LanguageUser
    has_many :languages, through: [:language_users, :language]
    
    timestamps
  end

  @required_fields ~w(name)
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
