import ProductDetails from '@/components/pages/web/shop/ProductDetails'

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return <ProductDetails params={{ id }} />;
};

export default ProductDetailsPage;