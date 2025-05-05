import { apiSlice } from "../../api/apiSlice";

const USERS_URL = "/api/users";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${USERS_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    toggleSuspendUser: builder.mutation({
      query: ({ id }) => ({
        url: `${USERS_URL}/suspend/${id}`,
        method: "PATCH",
      }),
    }),
    updateBalance: builder.mutation({
      query: ({ userId, balance }) => ({
        url: `${USERS_URL}/balance/${userId}`,
        method: "PATCH",
        body: { balance },
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useToggleSuspendUserMutation,
  useUpdateBalanceMutation,
} = usersApi;
