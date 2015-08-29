defmodule App.Repo.Migrations.CreateLanguageUser do
  use Ecto.Migration

  def change do
    create table(:languages_users) do
      add :language_id, :integer
      add :user_id, :integer

      timestamps
    end

  end
end
