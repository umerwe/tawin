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
    FileText,
    CreditCard,
    User,
    Bell,
    Headset,
    type LucideIcon,
} from 'lucide-react';

export interface MenuItem {
    title: string;
    icon: LucideIcon;
    path: string;
}

export const sidebarMenu = [
    // Main Menu
    { title: "Dashboard", icon: LayoutGrid, path: "/" },
    { title: "OrderManagement", icon: ShoppingCart, path: "/orders" },
    { title: "Users", icon: Users, path: "/users" },
    { title: "Suppliers", icon: Truck, path: "/suppliers" },
    { title: "CouponCodes", icon: Tag, path: "/coupons" },
    { title: "FinancialTransfers", icon: DollarSign, path: "/transfers" },
    { title: "Brand", icon: Building, path: "/brand" },
    
    // Products
    { title: "AddProduct", icon: Package, path: "/products/add" },
    { title: "ProductList", icon: List, path: "/products" },
    { title: "LowStock", icon: AlertTriangle, path: "/low-stock" },
    { title: "CustomerReviews", icon: Star, path: "/reviews" },
    
    // Administration
    { title: "Admin", icon: Shield, path: "/admin" },
    { title: "ControlPermissions", icon: Settings, path: "/permissions" }
];