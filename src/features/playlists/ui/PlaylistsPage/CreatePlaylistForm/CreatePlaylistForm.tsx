import { type SubmitHandler, useForm } from "react-hook-form"
import type { CreatePlaylistArgs, CreatePlaylistAttributes } from "@/features/playlists/api/playlistsApi.types.ts"
import { useCreatePlaylistMutation } from "@/features/playlists/api/playlistsApi.ts"

type Props = {
  onPlaylistCreated?: () => void
}

export const CreatePlaylistForm = ({ onPlaylistCreated }: Props) => {
  const { register, handleSubmit, reset } = useForm<CreatePlaylistAttributes>()

  const [createPlaylist] = useCreatePlaylistMutation()

  const onSubmit: SubmitHandler<CreatePlaylistAttributes> = (formData) => {
    const requestBody: CreatePlaylistArgs = {
      data: {
        type: "playlists",
        attributes: formData,
      },
    }
    createPlaylist(requestBody)
      .unwrap()
      .then(() => {
        reset()
        onPlaylistCreated?.()
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create new playlist</h2>
      <div>
        <input {...register("title")} placeholder={"title"} />
      </div>
      <div>
        <input {...register("description")} placeholder={"description"} />
      </div>
      <button>create playlist</button>
    </form>
  )
}
