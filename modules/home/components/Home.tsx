import React from 'react';
import ProductGrid from '../../products/components/ProductGrid/ProductGrid';
import { getHomePageProducts } from '../shared/homeService';

/**
 * Home page to display the product grid
 */
function Home() {
  return (
    <div>
      <ProductGrid gridService={getHomePageProducts} />
    </div>
  );
}

export default Home;
