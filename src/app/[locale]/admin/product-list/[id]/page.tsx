"use client";

import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProductForm from "@/components/form/ProductForm";
import ProductImageForm from "@/components/form/ProductImageForm";
import { SpinnerLoader } from "@/components/common/SpinnerLoader";
import { ProductFormValues } from "@/components/pages/admin/AddProduct";
import { useProductBySlug, useUpdateProduct } from "@/hooks/useProducts";

const EditProductPage = () => {
    const { id } = useParams();
    const t = useTranslations("translation");
    const router = useRouter();

    const { data: productData, isLoading } = useProductBySlug(id as string);
    const { mutate: updateProduct, isPending } = useUpdateProduct();

    const methods = useForm<ProductFormValues>({
        defaultValues: {
            title: { en: "", ar: "" },
            description: { en: "", ar: "" },
            price: 0,
            category: "",
            remainingPieces: 0,
            isNewArrival: false,
            colors: [],
            sizes: [],
            weights: [{ unit: "", value: "" }],
            photo: null, // Initial state
            images: [], // Initial state
        },
        // 'values' updates the form when API data arrives
        values: productData ? {
            title: {
                en: productData.title?.en || "",
                ar: productData.title?.ar || "",
            },
            description: {
                en: productData.description?.en || "",
                ar: productData.description?.ar || "",
            },
            price: productData.price ?? 0,
            category: productData.category?._id ?? productData.category ?? "",
            remainingPieces: productData.remainingPieces ?? 0,
            isNewArrival: productData.isNewArrival ?? false,
            colors: productData.colors ?? [],
            sizes: productData.sizes ?? [],
            weights: productData.weights?.length
                ? productData.weights
                : [{ unit: "", value: "" }],
            // Map the single photo and gallery images from your API
            photo: productData.photo || null, 
            images: productData.images ?? [],
        } : undefined,
    });

    const onSubmit = (values: ProductFormValues) => {
        const fd = new FormData();

        // Standard Fields
        fd.append("title[en]", values.title.en);
        fd.append("title[ar]", values.title.ar);
        fd.append("description[en]", values.description.en);
        fd.append("description[ar]", values.description.ar);
        fd.append("category", values.category);
        fd.append("price", String(values.price));
        fd.append("remainingPieces", String(values.remainingPieces));
        fd.append("isNewArrival", String(values.isNewArrival));

        values.colors.forEach((c) => fd.append("colors", c));
        values.sizes.forEach((s) => fd.append("sizes", s));

        if (values.weights[0]?.unit && values.weights[0]?.value) {
            fd.append("weights[0][unit]", values.weights[0].unit);
            fd.append("weights[0][value]", values.weights[0].value);
        }

        // --- IMAGE SUBMISSION LOGIC ---

        // 1. Handle "photo" (Single field)
        // If it's a File (newly uploaded) or a string (existing URL to keep), append it
        if (values.photo) {
            fd.append("photo", values.photo);
        }

        // 2. Handle "images" (Gallery array)
        if (values.images && values.images.length > 0) {
            values.images.forEach((img) => {
                fd.append("images", img);
            });
        }

        // For debugging
        console.log("Submitting FormData:", Object.fromEntries(fd.entries()));
        
        updateProduct({ id: productData?._id || (id as string), formData: fd });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-60">
                <SpinnerLoader />
            </div>
        );
    }

    if (!productData) {
        return (
            <div className="p-6 text-gray-500 text-sm text-center">
                {t("productNotFound")}
            </div>
        );
    }

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-6 p-1 mb-10"
            >
                <div className="flex items-center justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-12 w-12"
                        onClick={() => router.push("/admin/products/add")}
                    >
                        <Plus size={24} />
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 items-start">
                    <ProductForm isEdit={true} />
                    <ProductImageForm
                        existingPhoto={productData?.photo}
                        existingImages={productData?.images ?? []}
                        isEdit={true}
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <Button
                        type="submit"
                        disabled={isPending}
                        variant="primary"
                        className="h-12 min-w-[140px] px-8 rounded-md"
                    >
                        {isPending ? <SpinnerLoader /> : t("saveProduct")}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};

export default EditProductPage;