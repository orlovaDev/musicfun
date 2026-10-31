// Во избежание ошибок импорт должен быть из `@reduxjs/toolkit/query/react`
import type {
  CreatePlaylistArgs,
  PlaylistData,
  PlaylistsResponse,
  UpdatePlaylistArgs,
} from "@/features/playlists/api/playlistsApi.types.ts"
import { baseApi } from "@/app/api/baseApi.ts"

// `createApi` - функция из `RTK Query`, позволяющая создать объект `API`
// для взаимодействия с внешними `API` и управления состоянием приложения
export const playlistsApi = baseApi.injectEndpoints({
  // `reducerPath` - имя куда будут сохранены состояние и экшены для этого `API`

  // `endpoints` - метод, возвращающий объект с эндпоинтами для `API`, описанными
  // с помощью функций, которые будут вызываться при вызове соответствующих методов `API`
  // (например `get`, `post`, `put`, `patch`, `delete`)
  endpoints: (build) => ({
    // Типизация аргументов (<возвращаемый тип, тип query аргументов (`QueryArg`)>)
    // `query` по умолчанию создает запрос `get` и указание метода необязательно
    fetchPlaylists: build.query<PlaylistsResponse, void>({
      query: () => "playlists",
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
  }),
})

// `createApi` создает объект `API`, который содержит все эндпоинты в виде хуков,
// определенные в свойстве `endpoints`
export const {
  useFetchPlaylistsQuery,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useUpdatePlaylistMutation,
} = playlistsApi
