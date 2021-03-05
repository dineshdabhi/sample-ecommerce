import React, { useEffect, useState } from 'react';
import {useSelector} from "react-redux";
import { Grid, Typography } from '@material-ui/core';
import { cloneDeep } from 'lodash';
import { FindInPage } from '@material-ui/icons';
import ProductGridItem from '../ProductGridItem/ProductGridItem';
import classes from './ProductGrid.module.scss';
import { Product } from '../../shared/product.type';
import Loader from '../../../shared/components/Loader';
import { sleep } from '../../../shared/utils';

interface IProdductGridProps{
  gridService: ({ page }: {page: number})=> Promise<any>,
  triggerChange?: any,
  gridWithSearchPanel?: boolean
}

/**
 * Product not found layout
 */
function NoProductFound() {
  return (
    <Grid container style={{ height: 400 }} justify="center" alignItems="center">
      <Grid item style={{ textAlign: 'center' }}>
        <FindInPage style={{ fontSize: 100, color: '#af6565' }} />
        <Typography variant="h2">No Product Found ...</Typography>
        <Typography variant="h5">
          Sorry, we are not able to find the product you are looking for ...
        </Typography>
      </Grid>
    </Grid>
  );
}

interface IProductResponse {
  records: Array<Product>,
  page: number,
  totalPages: number
}

/**
 * Product grid with grid service to load the product ,trigger to change the grid
 */
export default function ProductGrid({ gridService, triggerChange }:
IProdductGridProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [productResponse, setProductResponse] = useState<IProductResponse>({
    page: 1,
    totalPages: 1,
    records: [],
  });
  const cartItems = useSelector((state) => state.cartState.cartItems);

  const setProductsData = (responseData) => {
    const tempProducts = cloneDeep(responseData.records);
    tempProducts.forEach((product) => {
      const foundCartItem = cartItems.find((record) => record.productId === product._id);
      if (foundCartItem) {
        // eslint-disable-next-line no-param-reassign
        product.quantity = foundCartItem.quantity;
      }
    });
    let newProducts = tempProducts;
    if (responseData.page !== 1) {
      newProducts = [...productList, ...tempProducts];
    }
    setProductList(newProducts);
  };

  const getProductsRecords = async ({ page }) => {
    try {
      setIsLoading(true);
      await sleep(2000);
      const response = await gridService({ page });
      setProductResponse(response);
      setProductsData(response);
    } catch (e) {
      // Do nothing
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    getProductsRecords({ page: 1 });
  }, [triggerChange]);

  // useEffect(() => {
  //   setProductsData(productResponse);
  // }, [cartItems]);

  return (
    productList.length > 0
      ? (
        <>
          {/* If there is product length > 0 then show the list of the products */}
          <Grid container className={`${classes.gridContainer}`}>
            <Grid
              item
              container
              spacing={4}
              justify="flex-start"
            >
              {productList.map((product) => (
                <ProductGridItem product={product} key={product._id} />
              ))}
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          { /* If there is product length == 0 then show either
           loader or no product found message */ }
          { isLoading
            ? <Loader />
            : <NoProductFound />}
        </>
      )
  );
}

ProductGrid.defaultProps = { triggerChange: '', gridWithSearchPanel: false };
