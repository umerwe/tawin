"use client"

import Container from "@/components/common/Container"
import { ProductImageGallery } from "@/components/pages/web/shop/ProductImageGallery"
import { ProductInfo } from "@/components/pages/web/shop/ProductInfo"
import { ProductDescription } from "@/components/pages/web/shop/ProductDescription"
import Reviews from "@/components/pages/web/shop/Reviews"
import Breadcrumb from "@/components/ui/breadcrumb"
import { useLocale, useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { useProductBySlug } from "@/hooks/useProducts"
import { SpinnerLoader } from "@/components/common/SpinnerLoader"
import { useProductReviews } from "@/hooks/useReviews"

interface ProductDetailsProps {
    params: string
}

const ProductDetails = ({ params }: ProductDetailsProps) => {
    const locale = useLocale() as "en" | "ar";
    const t = useTranslations("translation");

    const { data: product, isLoading, error } = useProductBySlug(params);
    const { data: reviewData,isLoading: isReviewLoading } = useProductReviews(product?._id as string);

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center container mx-auto px-4 py-20">
                <SpinnerLoader />
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center container mx-auto px-4 py-20 text-center">
                <div className="bg-red-100 p-6 rounded-full mb-4">
                    <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold mb-4">{t("productNotFound")}</h1>
                <p className="text-muted-foreground">{t("productNotFoundDescription")}</p>
                <Button
                    variant="link"
                    className="mt-4 text-aqua"
                    onClick={() => window.location.href = '/shop'}
                >
                    {t("viewAllProducts")}
                </Button>
            </div>
        )
    }

    return (
        <Container className="px-4 sm:px-6 space-y-10 pt-8 pb-16">
            <div className="flex items-center justify-between">
                <Breadcrumb
                    items={[
                        { title: t("home"), href: "/home" },
                        { title: t("shop"), href: "/shop" },
                        { title: product.title[locale], href: `#` },
                    ]}
                />
                <Button
                    variant="destructive"
                    size="sm"
                    className="bg-destructive/40 pointer-events-none"
                >
                    {t("remaining")}: {product.remainingPieces} {t("pieces")}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <ProductImageGallery
                    images={product?.images || []}
                    isNew={product.isNewArrival || false}
                    discount={product.discount}
                />

                <ProductInfo
                    product={product}
                />
            </div>

            <ProductDescription
                productKey={product._id}
                productCode={product.slug}
                category={product?.category?.name?.[locale]}
            />

            <Reviews product={product} reviews={reviewData || []} isReviewsLoading={isReviewLoading} />
        </Container>
    )
}

export default ProductDetails