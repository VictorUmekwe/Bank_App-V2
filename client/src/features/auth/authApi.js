import { apiSlice } from "../../api/apiSlice";

const AUTH_URL = "/api/auth";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
      }),
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: `${AUTH_URL}/profile`,
        providesTags: ["User"],
      }),
    }),
  }),
});

export const { useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useGetProfileQuery,} = authApi