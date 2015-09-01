defmodule App.Repo.Migrations.CreateLanguage do
  use Ecto.Migration

  def change do
    create table(:languages) do
      add :name, :string, null: false

      timestamps
    end

  end
end
