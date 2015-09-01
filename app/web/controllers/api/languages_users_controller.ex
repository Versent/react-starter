defmodule App.Api.LanguagesUsersController do
  use App.Web, :controller
  alias App.LanguageUser
  import Logger

  def index(conn, _params) do
    languages = LanguageUser |> Repo.all #|> Repo.preload [:users]
    render conn, model: languages
  end

  def show(conn, params) do
    # Logger.debug params |> inspect
    language = LanguageUser |> Repo.get(params["id"]) |> Repo.preload [:users]
    render conn, model: language
  end

  def create(conn, %{"language_user" => language_user_params}) do
    changeset = LanguageUser.changeset(%LanguageUser{}, language_user_params)

    case Repo.insert(changeset) do
      {:ok, language_user} ->
        render conn, "show.json", model: language_user
      {:error, changeset} ->
        conn
          |> put_status(:bad_request)
          |> json App.RenderErrors.errors_for_changeset(changeset)
    end
  end

  # def update(conn, %{"id" => id, "language" => user_params}) do
  #   language = Repo.get(Language, id)
  #   changeset = Language.changeset(language, user_params)

  #   if changeset.valid? do
  #     language = Repo.update(changeset)
  #     # render conn, "show.json", model: language
  #     render conn, "show.json", model: App.Repo.get(Language, id)
  #   else
  #     conn
  #       |> put_status(:bad_request)
  #       |> json App.RenderErrors.errors_for_changeset(changeset)
  #   end
  # end

  def delete(conn, %{"id" => id}) do
    language_user = Repo.get!(LanguageUser, id)
    Repo.delete!(language_user)
    render conn, "show.json", model: language_user
  end


end
