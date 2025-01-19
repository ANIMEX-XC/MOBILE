import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";
import { INavigationParamList } from "../../models/navigationModel";
import {
  View,
  Text,
  Image,
  HStack,
  VStack,
  Button,
  ButtonText,
  ScrollView,
  Pressable,
} from "@/app/components/ui";
import { MaterialIcons } from "@expo/vector-icons";

type DetailProductScreenPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "DetailProduct"
>;

export default function DetailProductScreen({
  navigation,
  route,
}: DetailProductScreenPropsTypes) {
  const { id } = route.params;

  // Sample product data (replace with actual data fetching)
  const product = {
    id: id,
    name: "Golden Retriever Puppy",
    breed: "Golden Retriever",
    image: "https://example.com/golden.jpg",
    price: 1500,
    description: "A friendly and playful Golden Retriever puppy.",
    seller: {
      name: "Premium Pets",
      verified: true,
    },
    location: "New York, NY",
    isAuction: true,
    currentBid: 1500,
    timeLeft: "2h 15m",
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: product.name,
    });
  }, [navigation, product.name]);

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView>
        {/* Product Image */}
        <Image
          source={{ uri: product.image }}
          alt={product.name}
          className="w-full h-60 rounded-b-lg"
        />

        {/* Product Details */}
        <VStack className="p-4">
          <Text className="text-2xl font-bold">{product.name}</Text>
          <Text className="text-gray-500">{product.breed}</Text>
          <Text className="text-lg font-semibold mt-2">
            Price: ${product.price}
          </Text>

          {/* Auction Info */}
          {product.isAuction && (
            <HStack className="mt-2">
              <Text className="text-[#5730ef] font-bold">
                Current Bid: ${product.currentBid}
              </Text>
              <Text className="text-gray-500 ml-2">
                Time Left: {product.timeLeft}
              </Text>
            </HStack>
          )}

          {/* Seller Info */}
          <HStack className="mt-4 items-center">
            <MaterialIcons
              name={product.seller.verified ? "verified" : "person"}
              size={24}
              color={product.seller.verified ? "#5730ef" : "#666"}
            />
            <Text className="ml-2">{product.seller.name}</Text>
          </HStack>

          {/* Description */}
          <Text className="mt-4 text-gray-700">{product.description}</Text>

          {/* Action Buttons */}
          <HStack className="mt-6 space-x-4">
            <Button
              className="flex-1 bg-[#5730ef] rounded-lg"
              onPress={() => {
                // Handle bid or purchase action
              }}
            >
              <ButtonText>Place Bid</ButtonText>
            </Button>
            <Button
              className="flex-1 bg-gray-200 rounded-lg"
              onPress={() => {
                // Handle favorite action
              }}
            >
              <ButtonText>Add to Favorites</ButtonText>
            </Button>
          </HStack>
        </VStack>
      </ScrollView>
    </View>
  );
}
