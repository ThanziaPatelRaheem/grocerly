import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "./userApi";
import { setIsAuthenticated, setUser } from "../features/userSlice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query(body) {
        return {
          url: "/register",
          method: "POST",
          body,
        };
      },

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {
          console.log("error from the authApi", error);
        }
      },
    }),
    login: builder.mutation({
      query(body) {
        return {
          url: "/login",
          method: "POST",
          body,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {
          console.log("error from the authApi", error);
        }
      },
    }),
    logout: builder.query({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),

      // async onQueryStarted(_, { dispatch, queryFulfilled }) {
      //   try {
      //     await queryFulfilled;
      //   } finally {
      //     // clear slice so Header re-renders to Login
      //     dispatch(setUser(null));
      //     dispatch(setIsAuthenticated(false));

      //     // either invalidate the tag so /me refetches as unauthenticated
      //     dispatch(userApi.util.invalidateTags(["Auth"]));

      //     // or fully reset RTKQ caches:
      //     // dispatch(userApi.util.resetApiState());
      //   }
      // },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLazyLogoutQuery } =
  authApi;
