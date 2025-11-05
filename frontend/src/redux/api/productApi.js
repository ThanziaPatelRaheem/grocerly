import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: "/products",
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          keyword: params.keyword || undefined,
          category: params.category || undefined,
          "price[gte]": params.min,
          "price[lte]": params.max,
        },
      }),
    }),
    getProductDetails: builder.query({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useLazyGetProductsQuery, useGetProductDetailsQuery } =
  productApi;
// return `/products?page=${page}&limit=${limit}`;
