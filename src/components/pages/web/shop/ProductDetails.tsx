"use client"

import Container from "@/components/common/Container"
import { ProductImageGallery } from "@/components/pages/web/shop/ProductImageGallery"
import { ProductInfo } from "@/components/pages/web/shop/ProductInfo"
import { ProductDescription } from "@/components/pages/web/shop/ProductDescription"
import Reviews from "@/components/pages/web/shop/Reviews"
import Breadcrumb from "@/components/ui/breadcrumb"
import { products } from "@/constants/products"
import { useLocale, useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"

interface ProductDetailsProps {
    params: { id: string }
}

const ProductDetails = ({ params }: ProductDetailsProps) => {
    const locale = useLocale() as "en" | "ar";
    const t = useTranslations("translation");

    const product = products.find(p => p.id.toString() === params.id)

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">{t("productNotFound")}</h1>
                <p className="text-muted-foreground">{t("productNotFoundDescription")}</p>
            </div>
        )
    }

    return (
        <Container className="px-4 sm:px-6 space-y-10 pt-8 pb-16">
            <div className="flex items-center justify-between">
                <Breadcrumb
                    items={[
                        { title: t("home"), href: "/home" },
                        { title: t("product"), href: `/product` },
                    ]}
                />
                <Button
                    variant="destructive"
                    size="sm"
                >
                    {t("remaining")}: 4 {t("pieces")}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <ProductImageGallery
                    images={[product.image]}
                    isNew={product.isNew}
                    discount={product.discount}
                />

                <ProductInfo
                    product={product}
                />
            </div>

            <ProductDescription
                productKey={product.id.toString()}
                productCode={product.id.toString()}
                category={product.category[locale] || "MCP Doors"}
            />

            <Reviews productName={product.title[locale]} />
        </Container>
    )
}

export default ProductDetails