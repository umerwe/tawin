export interface CardProps {
  title: string;
  subtitle: string;
  value: string;
  change: string;
  changeLabel: string;
  changeType: "increase" | "decrease";
  footerValue: string;
  footerLabel: string;
}

export const ordersData = [
  {
    id: 1,
    orderId: "#ORD0001",
    date: "01-01-2025",
    source: "Online",
    status: "Delivered",
    total: 49.99,
    customer: "John Doe",
    quantity: 1,
  },
  {
    id: 2,
    orderId: "#ORD0002",
    date: "01-01-2025",
    source: "Online",
    status: "Processing",
    total: 49.99,
    customer: "Sarah Williams",
    quantity: 1,
  },
  {
    id: 3,
    orderId: "#ORD0003",
    date: "01-01-2025",
    source: "Online",
    status: "In Transit",
    total: 49.99,
    customer: "Mike Johnson",
    quantity: 1,
  },
  {
    id: 4,
    orderId: "#ORD0004",
    date: "01-01-2025",
    source: "Store",
    status: "Not Delivered",
    total: 49.99,
    customer: "Emily Davis",
    quantity: 1,
  },
  {
    id: 5,
    orderId: "#ORD0005",
    date: "01-01-2025",
    source: "Online",
    status: "Delivered",
    total: 49.99,
    customer: "James Wilson",
    quantity: 1,
  },
  {
    id: 6,
    orderId: "#ORD0006",
    date: "01-01-2025",
    source: "Online",
    status: "Delivered",
    total: 49.99,
    customer: "Lisa Anderson",
    quantity: 1,
  },
  {
    id: 7,
    orderId: "#ORD0007",
    date: "01-01-2025",
    source: "Online",
    status: "Delivered",
    total: 49.99,
    customer: "Robert Taylor",
    quantity: 1,
  },
  {
    id: 8,
    orderId: "#ORD0008",
    date: "01-01-2025",
    source: "Online",
    status: "Delivered",
    total: 49.99,
    customer: "Patricia Martinez",
    quantity: 1,
  },
  {
    id: 9,
    orderId: "#ORD0009",
    date: "01-01-2025",
    source: "Online",
    status: "Delivered",
    total: 49.99,
    customer: "Richard Garcia",
    quantity: 1,
  },
  {
    id: 10,
    orderId: "#ORD0010",
    date: "01-01-2025",
    source: "Online",
    status: "Delivered",
    total: 49.99,
    customer: "Jennifer Lee",
    quantity: 1,
  },
];

export const statusConfig = {
  delivered: {
    label: "Delivered",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  processing: {
    label: "Processing",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  inTransit: {
    label: "In Transit",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  notDelivered: {
    label: "Not Delivered",
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
};

export const orderStats: CardProps[] = [
  {
    title: "Total Orders",
    subtitle: "This month",
    value: "1,240",
    change: "14.4%",
    changeLabel: "this month",
    changeType: "increase",
    footerValue: "this month",
    footerLabel: "Orders",
  },
  {
    title: "Completed Orders",
    subtitle: "All time",
    value: "960",
    change: "8.5%",
    changeLabel: "this month",
    changeType: "increase",
    footerValue: "this month",
    footerLabel: "Completed",
  },
  {
    title: "Pending Orders",
    subtitle: "All time",
    value: "240",
    change: "20%",
    changeLabel: "this month",
    changeType: "decrease",
    footerValue: "this month",
    footerLabel: "Pending",
  },
  {
    title: "Failed Orders",
    subtitle: "All time",
    value: "67",
    change: "3%",
    changeLabel: "this month",
    changeType: "decrease",
    footerValue: "this month",
    footerLabel: "Failed",
  },
];
