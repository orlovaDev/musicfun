// Во избежание ошибок импорт должен быть из `@reduxjs/toolkit/query/react`
import type {
  CreatePlaylistArgs,
  FetchPlaylistsArgs,
  PlaylistData,
  PlaylistsResponse,
  UpdatePlaylistArgs,
} from "@/features/playlists/api/playlistsApi.types.ts"
import { baseApi } from "@/app/api/baseApi.ts"
import type { Images } from "@/common/types"

// `createApi` - функция из `RTK Query`, позволяющая создать объект `API`
// для взаимодействия с внешними `API` и управления состоянием приложения
export const playlistsApi = baseApi.injectEndpoints({
  // `reducerPath` - имя куда будут сохранены состояние и экшены для этого `API`

  // `endpoints` - метод, возвращающий объект с эндпоинтами для `API`, описанными
  // с помощью функций, которые будут вызываться при вызове соответствующих методов `API`
  // (например `get`, `post`, `put`, `patch`, `delete`)
  endpoints: (build) => {
    return {
      // Типизация аргументов (<возвращаемый тип, тип query аргументов (`QueryArg`)>)
      // `query` по умолчанию создает запрос `get` и указание метода необязательно
      fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
        query: (params) => ({ method: "GET", url: "playlists", params }),
        providesTags: ["Playlist"],
      }),
      createPlaylist: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
        query: (body) => ({ method: "POST", url: "playlists", body }),
        invalidatesTags: ["Playlist"],
      }),
      deletePlaylist: build.mutation<void, string>({
        query: (playlistId) => ({ method: "DELETE", url: `playlists/${playlistId}` }),
        invalidatesTags: ["Playlist"],
      }),
      updatePlaylist: build.mutation<void, { playlistId: string; body: UpdatePlaylistArgs }>({
        query: ({ playlistId, body }) => ({ method: "PUT", url: `playlists/${playlistId}`, body }),
        invalidatesTags: ["Playlist"],
      }),
      uploadPlaylistCover: build.mutation<Images, { playlistId: string; file: File }>({
        query: ({ playlistId, file }) => {
          const formData = new FormData()
          formData.append("file", file)
          return { method: "POST", url: `playlists/${playlistId}/images/main`, body: formData }
        },
        invalidatesTags: ["Playlist"],
      }),
      deletePlaylistCover: build.mutation<void, { playlistId: string }>({
        query: ({ playlistId }) => ({ method: "DELETE", url: `playlists/${playlistId}/images/main` }),
        invalidatesTags: ["Playlist"],
      }),
    }
  },
})

// `createApi` создает объект `API`, который содержит все эндпоинты в виде хуков,
// определенные в свойстве `endpoints`
export const {
  useFetchPlaylistsQuery,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useUpdatePlaylistMutation,
  useUploadPlaylistCoverMutation,
  useDeletePlaylistCoverMutation,
} = playlistsApi
