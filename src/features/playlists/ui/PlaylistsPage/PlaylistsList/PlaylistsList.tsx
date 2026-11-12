import s from "./PlaylistsList.module.css"
import { useForm } from "react-hook-form"
import { useState } from "react"
import type { PlaylistData, UpdatePlaylistAttributes } from "@/features/playlists/api/playlistsApi.types.ts"
import { useDeletePlaylistMutation } from "@/features/playlists/api/playlistsApi.ts"
import { EditPlaylistForm } from "@/features/playlists/ui/PlaylistsPage/EditPlaylistForm/EditPlaylistForm.tsx"
import { PlaylistItem } from "../PlaylistItem/PlaylistItem"

type Props = {
  playlists: PlaylistData[]
  isPlaylistsLoading: boolean
}

export const PlaylistsList = ({ playlists, isPlaylistsLoading }: Props) => {
  const [playlistId, setPlaylistId] = useState<string | null>(null)

  const { register, handleSubmit, reset } = useForm<UpdatePlaylistAttributes>()

  const [deletePlaylist] = useDeletePlaylistMutation()
  const deletePlaylistHandler = (playlistId: string) => {
    if (confirm("Are you sure you want to delete the playlist?")) {
      deletePlaylist(playlistId)
    }
  }

  const editPlaylistHandler = (playlist: PlaylistData | null) => {
    if (playlist) {
      setPlaylistId(playlist.id)
      reset({
        title: playlist.attributes.title,
        description: playlist.attributes.description,
        tagIds: playlist.attributes.tags.map((tag) => tag.id),
      })
    } else {
      setPlaylistId(null)
    }
  }

  return (
    <div className={s.items}>
      {!playlists.length && !isPlaylistsLoading && <h2>Playlists not found</h2>}
      {playlists.map((playlist) => {
        const isEditing = playlist.id === playlistId

        return (
          <div className={s.item} key={playlist.id}>
            {isEditing ? (
              <EditPlaylistForm
                playlistId={playlistId}
                setPlaylistId={setPlaylistId}
                editPlaylist={editPlaylistHandler}
                register={register}
                handleSubmit={handleSubmit}
              />
            ) : (
              <PlaylistItem
                playlist={playlist}
                deletePlaylistHandler={deletePlaylistHandler}
                editPlaylistHandler={editPlaylistHandler}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
