"use client";

import { useForm, FormProvider } from "react-hook-form";
import { useAddProduct } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import ProductForm from "@/components/form/ProductForm";
import ProductImageForm from "@/components/form/ProductImageForm";
import { SpinnerLoader } from "@/components/common/SpinnerLoader";
import { useTranslations } from "next-intl";

export interface ProductFormValues {
    title: { en: string; ar: string };
    description: { en: string; ar: string };
    price: number;
    category: string;
    remainingPieces: number;
    isNewArrival: boolean;
    colors: string[];
    sizes: string[];
    weights: { unit: string; value: string }[];
    photo: File | string | null;     
    images: (File | string)[];
}

export default function AddProductPage() {
    const t = useTranslations("translation");

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
            photo: null,
            images: []
        },
    });

    const { mutate: addProduct, isPending } = useAddProduct();

    const onSubmit = (values: ProductFormValues) => {
        const fd = new FormData();

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

        if (values.photo) {
            fd.append("photo", values.photo);
        }

        // Append the gallery array
        values.images.forEach((img) => {
            fd.append("images", img);
        });

        addProduct(fd);
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-6 p-1 mb-10"
            >

                <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 items-start">
                    <ProductForm />
                    <ProductImageForm />
                </div>

                <div className="flex justify-end gap-3">
                    <Button
                        type="submit"
                        disabled={isPending}
                        variant="primary"
                        className="h-12 max-w-34 px-8 rounded-md"
                    >
                        {isPending ? <SpinnerLoader /> : t("saveProduct")}
                    </Button>
                </div>

            </form>
        </FormProvider>
    );
}