import {
    LayoutGrid,
    ShoppingCart,
    Users,
    Truck,
    Tag,
    DollarSign,
    Building,
    Package,
    List,
    AlertTriangle,
    Star,
    Shield,
    Settings,
    type LucideIcon,
} from 'lucide-react';

export interface MenuItem {
    title: string;
    icon: LucideIcon;
    path: string;
}

export const sidebarMenu = [
    // Main Menu
    { title: "dashboard", icon: LayoutGrid, path: "/admin" },
    { title: "orderManagement", icon: ShoppingCart, path: "/admin/orders" },
    { title: "users", icon: Users, path: "/admin/users" },
    { title: "suppliers", icon: Truck, path: "/admin/suppliers" },
    { title: "couponCodes", icon: Tag, path: "/admin/coupons" },
    { title: "financialTransfers", icon: DollarSign, path: "/admin/transfers" },
    { title: "brand", icon: Building, path: "/admin/brand" },

    // Products
    { title: "addProduct", icon: Package, path: "/admin/products/add" },
    { title: "productList", icon: List, path: "/admin/product-list" },
    { title: "lowStock", icon: AlertTriangle, path: "/admin/low-stock" },
    { title: "customerReviews", icon: Star, path: "/admin/reviews" },

    // Administration
    { title: "manager", icon: Shield, path: "/admin/manager" },
    { title: "controlPermissions", icon: Settings, path: "/admin/permissions" }
];