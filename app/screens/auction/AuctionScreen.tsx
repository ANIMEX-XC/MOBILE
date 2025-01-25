import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import { INavigationParamList } from "../../models/navigationModel";
import { View, Text, Input, InputField, InputSlot } from "@/app/components/ui";
import { MaterialIcons } from "@expo/vector-icons";
import { FlatList } from "react-native";
import { ProductCard } from "@/app/components";
import { Product } from "@/app/components/types/product";
import { HStack } from "@/app/components/ui/hstack";
import { Pressable } from "@/app/components/ui/pressable";
import { ScrollView } from "@/app/components/ui/scroll-view";

type AuctionScreenPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "Auction"
>;

export default function AuctionScreen({ navigation }: AuctionScreenPropsTypes) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [auctions, setAuctions] = useState<Product[]>([
    {
      id: "1",
      name: "Golden Retriever Puppy",
      breed: "Golden Retriever",
      image: "https://example.com/golden.jpg",
      price: 1500,
      location: "New York, NY",
      isAuction: true,
      timeLeft: "2h 15m",
      currentBid: 1500,
      seller: {
        name: "Premium Pets",
        verified: true,
      },
    },
    // Add more auctions...
  ]);

  const filters = [
    { id: "all", name: "All Auctions", icon: "gavel" },
    { id: "ending-soon", name: "Ending Soon", icon: "timer" },
    { id: "my-bids", name: "My Bids", icon: "local-offer" },
    { id: "won", name: "Won", icon: "emoji-events" },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="pt-12 px-4 bg-[#5730ef]">
        <HStack className="justify-between items-center mb-4">
          <Text className="text-xl font-bold text-white">Live Auctions</Text>
          <HStack className="space-x-4">
            <Pressable onPress={() => navigation.navigate("Notification")}>
              <MaterialIcons name="notifications" size={24} color="white" />
            </Pressable>
            <Pressable
            // onPress={() => navigation.navigate("AuctionHistory")}
            >
              <MaterialIcons name="history" size={24} color="white" />
            </Pressable>
          </HStack>
        </HStack>

        {/* Search Bar */}
        <Input className="bg-white/10 rounded-xl mb-4">
          <InputSlot className="pl-3">
            <MaterialIcons name="search" size={20} color="white" />
          </InputSlot>
          <InputField
            placeholder="Search auctions..."
            className="h-12 text-white"
            placeholderTextColor="rgba(255,255,255,0.7)"
          />
        </Input>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          <HStack space="sm" className="space-x-3">
            {filters.map((filter) => (
              <Pressable
                key={filter.id}
                onPress={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-full flex-row items-center space-x-2 ${
                  selectedFilter === filter.id ? "bg-white" : "bg-white/10"
                }`}
              >
                <MaterialIcons
                  name={filter.icon as any}
                  size={18}
                  color={selectedFilter === filter.id ? "#5730ef" : "white"}
                />
                <Text
                  className={
                    selectedFilter === filter.id
                      ? "text-[#5730ef]"
                      : "text-white"
                  }
                >
                  {filter.name}
                </Text>
              </Pressable>
            ))}
          </HStack>
        </ScrollView>
      </View>

      {/* Auction Grid */}
      <FlatList
        data={auctions}
        renderItem={({ item }) => (
          <View className="p-2">
            <ProductCard
              item={item}
              onPress={() =>
                navigation.navigate("DetailAuction", { id: item.id })
              }
              className="w-full"
            />
          </View>
        )}
        numColumns={1}
        contentContainerStyle={{ padding: 14 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <MaterialIcons name="gavel" size={48} color="#ccc" />
            <Text className="text-gray-400 mt-4">No auctions found</Text>
          </View>
        }
      />
    </View>
  );
}
