defmodule App.RenderErrors do

	import Logger

	def errors_for_changeset(changeset) do
		# {
		# 	"time": ["is invalid"]
		# }

		# ->

		# [
		# 	%{
		# 		title: message
		# 	}
		# ]

		converter = fn(kl) ->
			title = "#{elem(kl, 0)} #{elem(kl, 1)}"
			%{title: title}
		end

		errors = changeset.errors
			|> Enum.map(converter)

		# Logger.debug errors |> inspect

		%{
			errors: errors
		}
	end
end
