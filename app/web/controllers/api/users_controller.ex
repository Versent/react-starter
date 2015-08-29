defmodule App.Api.UsersController do
  use App.Web, :controller
  alias App.User
  import Logger

  def index(conn, _params) do
    users = User |> Repo.all |> Repo.preload [:languages]
    render conn, model: users
  end

  def show(conn, params) do
    # Logger.debug params |> inspect
    user = User |> Repo.get(params["id"]) |> Repo.preload [:languages]
    render conn, model: user
  end

  def create(conn, %{"user" => user_params}) do
    changeset = User.changeset(%User{}, user_params)

    case Repo.insert(changeset) do
      {:ok, user} ->
        render conn, "show.json", model: user
      {:error, changeset} ->
        conn
          |> put_status(:bad_request)
          |> json App.RenderErrors.errors_for_changeset(changeset)
    end
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Repo.get(User, id)
    changeset = User.changeset(user, user_params)

    if changeset.valid? do
      user = Repo.update(changeset)
      # render conn, "show.json", model: user
      render conn, "show.json", model: App.Repo.get(User, id)
    else
      conn
        |> put_status(:bad_request)
        |> json App.RenderErrors.errors_for_changeset(changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
     user = Repo.get!(User, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(user)

    # conn
    # |> put_flash(:info, "User deleted successfully.")
    # |> redirect(to: user_path(conn, :index))
    render conn, "show.json", model: user
  end


end
