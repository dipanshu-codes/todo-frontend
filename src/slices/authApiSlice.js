import { apiSlice } from "./apiSlice";

const AUTH_API = "/api/auth";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_API}/login`,
        method: "POST",
        body: data,
      }),
      providesTags: ["User"],
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: `${AUTH_API}/signup`,
        method: "POST",
        body: data,
      }),
      providesTags: ["User"],
    }),
    profile: builder.query({
      query: () => ({
        url: "/api/user",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/api/user",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useProfileQuery,
  useUpdateProfileMutation,
} = authApiSlice;
