import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://todos-backend-d8sc.onrender.com",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.user;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["User", "Todos"],
  endpoints: (builder) => ({}),
});
