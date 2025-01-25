import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import { INavigationParamList } from "../../models/navigationModel";
import {
  View,
  Text,
  ScrollView,
  HStack,
  VStack,
  Pressable,
  Input,
  InputField,
  InputSlot,
  Image,
} from "@/app/components/ui";
import { MaterialIcons } from "@expo/vector-icons";

type OrderScreenPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "Order"
>;

type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

interface Order {
  id: string;
  productName: string;
  price: number;
  quantity: number;
  status: OrderStatus;
  date: string;
  trackingNumber?: string;
  image: string;
}

export default function OrderScreen({ navigation }: OrderScreenPropsTypes) {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [orders] = useState<Order[]>([
    {
      id: "1",
      productName: "Golden Retriever Puppy",
      price: 1500,
      quantity: 1,
      status: "processing",
      date: "2024-03-15",
      trackingNumber: "TRK123456789",
      image: "https://example.com/golden.jpg",
    },
    // Add more orders...
  ]);

  const statusFilters = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "processing", label: "Processing" },
    { id: "shipped", label: "Shipped" },
    { id: "delivered", label: "Delivered" },
    { id: "cancelled", label: "Cancelled" },
  ];

  const getStatusColor = (status: OrderStatus) => {
    const colors = {
      pending: "bg-yellow-500",
      processing: "bg-blue-500",
      shipped: "bg-purple-500",
      delivered: "bg-green-500",
      cancelled: "bg-red-500",
    };
    return colors[status] || "bg-gray-500";
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="pt-12 px-4 bg-white">
        <HStack className="justify-between items-center mb-4">
          <Text className="text-xl font-bold">My Orders</Text>
          <Pressable
          //   onPress={() => navigation.navigate("OrderHistory")}
          >
            <MaterialIcons name="history" size={24} color="#5730ef" />
          </Pressable>
        </HStack>

        {/* Search Bar */}
        <Input className="bg-gray-50 rounded-xl mb-4">
          <InputSlot className="pl-3">
            <MaterialIcons name="search" size={20} color="#666" />
          </InputSlot>
          <InputField placeholder="Search orders..." className="h-12" />
        </Input>

        {/* Status Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          <HStack className="space-x-2">
            {statusFilters.map((filter) => (
              <Pressable
                key={filter.id}
                onPress={() => setSelectedStatus(filter.id)}
                className={`px-4 py-2 rounded-full ${
                  selectedStatus === filter.id ? "bg-[#5730ef]" : "bg-gray-100"
                }`}
              >
                <Text
                  className={`${
                    selectedStatus === filter.id
                      ? "text-white"
                      : "text-gray-700"
                  }`}
                >
                  {filter.label}
                </Text>
              </Pressable>
            ))}
          </HStack>
        </ScrollView>
      </View>

      {/* Orders List */}
      <ScrollView className="flex-1 px-4 pt-4">
        <VStack space="md">
          {orders.map((order) => (
            <Pressable
              key={order.id}
              //   onPress={() =>
              //     navigation.navigate("OrderDetail", { id: order.id })
              //   }
              className="bg-white p-4 rounded-xl"
            >
              <HStack className="items-center space-x-3">
                <View className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    source={{ uri: "https://picsum.photos/200" }}
                    alt={order.productName}
                    className="w-full h-full"
                  />
                </View>
                <VStack className="flex-1">
                  <Text className="font-semibold" numberOfLines={1}>
                    {order.productName}
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    Order #{order.id}
                  </Text>
                  <HStack className="justify-between items-center mt-2">
                    <Text className="text-[#5730ef] font-bold">
                      ${order.price}
                    </Text>
                    <View
                      className={`px-3 py-1 rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      <Text className="text-white text-xs capitalize">
                        {order.status}
                      </Text>
                    </View>
                  </HStack>
                </VStack>
              </HStack>

              {order.trackingNumber && (
                <VStack className="mt-3 pt-3 border-t border-gray-100">
                  <HStack className="justify-between">
                    <Text className="text-gray-500 text-sm">
                      Tracking Number:
                    </Text>
                    <Text className="text-sm font-medium">
                      {order.trackingNumber}
                    </Text>
                  </HStack>
                  <HStack className="justify-between mt-1">
                    <Text className="text-gray-500 text-sm">Order Date:</Text>
                    <Text className="text-sm font-medium">
                      {new Date(order.date).toLocaleDateString()}
                    </Text>
                  </HStack>
                </VStack>
              )}
            </Pressable>
          ))}
        </VStack>
      </ScrollView>
    </View>
  );
}
