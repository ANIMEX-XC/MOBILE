import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import { INavigationParamList } from "../../models/navigationModel";
import { View, Text, Input, InputField, InputSlot } from "@/app/components/ui";
import { MaterialIcons } from "@expo/vector-icons";
import { FlatList } from "react-native";
import { ProductCard } from "@/app/components/ProductCard";
import { Product } from "@/app/components/types/product";
import { HStack } from "@/app/components/ui/hstack";
import { Pressable } from "@/app/components/ui/pressable";
import { ScrollView } from "@/app/components/ui/scroll-view";

type ProductScreenPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "Product"
>;

export default function ProductScreen({ navigation }: ProductScreenPropsTypes) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Golden Retriever",
      breed: "Golden Retriever",
      image: "https://example.com/golden.jpg",
      price: 1500,
      location: "New York, NY",
      isAuction: true,
      timeLeft: "2h 15m",
      currentBid: 1500,
      seller: {
        name: "John Doe",
        verified: true,
      },
    },
    {
      id: "2",
      name: "Golden Retriever",
      breed: "Golden Retriever",
      image: "https://example.com/golden.jpg",
      price: 1500,
      location: "New York, NY",
      isAuction: false,
      seller: {
        name: "John Doe",
        verified: true,
      },
    },
    {
      id: "3",
      name: "Golden Retriever",
      breed: "Golden Retriever",
      image: "https://example.com/golden.jpg",
      price: 1500,
      location: "New York, NY",
      isAuction: false,
      seller: {
        name: "John Doe",
        verified: true,
      },
    },
    {
      id: "4",
      name: "Golden Retriever",
      breed: "Golden Retriever",
      image: "https://example.com/golden.jpg",
      price: 1500,
      location: "New York, NY",
      isAuction: false,
      seller: {
        name: "John Doe",
        verified: true,
      },
    },
  ]); // Replace with your data

  const categories = [
    { id: "all", name: "All Pets", icon: "pets" },
    { id: "dogs", name: "Dogs", icon: "dog" },
    { id: "cats", name: "Cats", icon: "cat" },
    { id: "birds", name: "Birds", icon: "bird" },
    { id: "fish", name: "Fish", icon: "fish" },
  ];

  const handleProductPress = (id: string) => {
    navigation.navigate("DetailProduct", { id });
  };

  const handleFavoritePress = (id: string) => {
    // Handle favorite toggle
    console.log("Favorite pressed:", id);
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
          <Text className="text-xl font-bold">Discover Pets</Text>
          <HStack className="space-x-4">
            <Pressable
              onPress={() => {
                /* Open filter */
              }}
            >
              <MaterialIcons name="filter-list" size={24} color="#5730ef" />
            </Pressable>
            <Pressable
              onPress={() => {
                /* Open search */
              }}
            >
              <MaterialIcons name="search" size={24} color="#5730ef" />
            </Pressable>
          </HStack>
        </HStack>

        {/* Search Bar */}
        <Input className="bg-gray-50 rounded-xl mb-4">
          <InputSlot className="pl-3">
            <MaterialIcons name="search" size={20} color="#666" />
          </InputSlot>
          <InputField placeholder="Search pets..." className="h-12" />
        </Input>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          <HStack className="space-x-3">
            {categories.map((category) => (
              <Pressable
                key={category.id}
                onPress={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 mx-1 rounded-full flex-row items-center space-x-2 ${
                  selectedCategory === category.id
                    ? "bg-[#5730ef]"
                    : "bg-gray-100"
                }`}
              >
                <MaterialIcons
                  name={category.icon as any}
                  size={18}
                  color={selectedCategory === category.id ? "white" : "#666"}
                />
                <Text
                  className={`${
                    selectedCategory === category.id
                      ? "text-white"
                      : "text-gray-700"
                  }`}
                >
                  {category.name}
                </Text>
              </Pressable>
            ))}
          </HStack>
        </ScrollView>
      </View>

      {/* Product Grid */}
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onPress={handleProductPress}
            onFavoritePress={handleFavoritePress}
            className="w-[48%]"
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
