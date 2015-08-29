defmodule App.Api.LanguagesController do
  use App.Web, :controller
  alias App.Language
  import Logger

  def index(conn, _params) do
    languages = Language |> Repo.all |> Repo.preload [:users]
    render conn, model: languages
  end

  def show(conn, params) do
    # Logger.debug params |> inspect
    language = Language |> Repo.get(params["id"]) |> Repo.preload [:users]
    render conn, model: language
  end

  def create(conn, %{"language" => user_params}) do
    changeset = Language.changeset(%Language{}, user_params)

    case Repo.insert(changeset) do
      {:ok, language} ->
        render conn, "show.json", model: language
      {:error, changeset} ->
        conn
          |> put_status(:bad_request)
          |> json App.RenderErrors.errors_for_changeset(changeset)
    end
  end

  def update(conn, %{"id" => id, "language" => user_params}) do
    language = Repo.get(Language, id)
    changeset = Language.changeset(language, user_params)

    if changeset.valid? do
      language = Repo.update(changeset)
      # render conn, "show.json", model: language
      render conn, "show.json", model: App.Repo.get(Language, id)
    else
      conn
        |> put_status(:bad_request)
        |> json App.RenderErrors.errors_for_changeset(changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
     language = Repo.get!(Language, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(language)

    # conn
    # |> put_flash(:info, "Language deleted successfully.")
    # |> redirect(to: user_path(conn, :index))
    render conn, "show.json", model: language
  end


end
