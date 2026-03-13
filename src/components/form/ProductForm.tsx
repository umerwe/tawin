"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Calendar,
    Wand2,
    Edit3,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const ProductForm = () => {
    return (
        <div className="lg:col-span-3">
            <Card className="border shadow-none h-full">
                <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-700">Product Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Product Name</Label>
                        <Input placeholder="iPhone 15" className="rounded-md" />
                    </div>

                    <div className="space-y-2">
                        <Label>Product Description</Label>
                        <div className="relative">
                            <textarea
                                className="w-full min-h-[140px] p-4 rounded-2xl bg-gray-50 border border-transparent focus:border-aqua outline-none text-sm text-gray-600 transition-all resize-none"
                                placeholder="Describe the product..."
                                defaultValue="The iPhone 15 delivers cutting-edge performance with the A16 Bionic chip, an immersive Super Retina XDR display, advanced dual-camera system, and exceptional battery life, all encased in stunning aerospace-grade aluminum." />
                            <div className="absolute bottom-4 left-4 flex gap-3 text-gray-400">
                                <Edit3 size={18} className="cursor-pointer hover:text-aqua transition-colors" />
                                <Wand2 size={18} className="cursor-pointer hover:text-aqua transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* Pricing Grid */}
                    <div className="space-y-4 pt-2">
                        <h3 className="text-lg font-bold text-gray-700">Pricing</h3>
                        <div className="space-y-2">
                            <Label>Product Price</Label>
                            <div className="relative">
                                <Input placeholder="999.89" className="pl-14 font-bold rounded-md" />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 pr-2 border-r border-gray-200">
                                    <span className="text-base">🇺🇸</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Reduced Price (Optional)</Label>
                            <div className="flex gap-4">
                                <Input placeholder="900.89 Discount" className="flex-1 rounded-md" />
                                <div className="h-[52px] px-6 bg-emerald-50 rounded-md flex items-center justify-center text-aqua font-bold border border-emerald-100">
                                    $99
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Date & Stock Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Expiration Date</Label>
                            <div className="relative">
                                <Input placeholder="Expiration Date" className="pl-12 rounded-md" />
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-aqua text-[10px] font-bold uppercase tracking-tighter">Day</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Production Date</Label>
                            <div className="relative">
                                <Input placeholder="Production Date" className="pl-12 rounded-md" />
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Warehouse (Availability)</Label>
                            <Select defaultValue="available">
                                <SelectTrigger className="rounded-md">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="available">Available</SelectItem>
                                    <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                                    <SelectItem value="pre-order">Pre-Order</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Stock Quantity</Label>
                            <Input placeholder="Unlimited" className="rounded-md" />
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col gap-4 pt-2">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-400">Unlimited</span>
                            <Switch className="data-[state=checked]:bg-aqua" checked />
                        </div>
                        <div className="flex items-center gap-3">
                            <Checkbox className="data-[state=checked]:bg-aqua border-gray-200 h-5 w-5 rounded" checked />
                            <span className="text-sm font-medium text-gray-400">Featured Products</span>
                        </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            className="w-44 rounded-md">
                            Save to Blog
                        </Button>
                        <Button
                            variant="primary"
                            className="w-44 rounded-md">
                            Share Product
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProductForm