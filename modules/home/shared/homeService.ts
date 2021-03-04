import { DUMMY_PRODUCTS } from "../../products/shared/products";

/* eslint-disable import/prefer-default-export */
export const getHomePageProducts = async () => ({
  page: 1,
  records: DUMMY_PRODUCTS,
  totalCount: 20,
  totalPages: 1
});
