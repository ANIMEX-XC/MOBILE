import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
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

type DetailAuctionScreenPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "DetailAuction"
>;

export default function DetailAuctionScreen({
  navigation,
  route,
}: DetailAuctionScreenPropsTypes) {
  const { id } = route.params;

  // Sample auction data (replace with actual data fetching)
  const auction = {
    id: id,
    name: "Golden Retriever Puppy",
    breed: "Golden Retriever",
    image: "https://example.com/golden.jpg",
    currentBid: 1500,
    timeLeft: "2h 15m",
    seller: {
      name: "Premium Pets",
      verified: true,
    },
    description: "A friendly and playful Golden Retriever puppy.",
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: auction.name,
    });
  }, [navigation, auction.name]);

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView>
        {/* Auction Image */}
        <Image
          source={{ uri: auction.image }}
          alt={auction.name}
          className="w-full h-60 rounded-b-lg"
        />

        {/* Auction Details */}
        <VStack className="p-4">
          <Text className="text-2xl font-bold">{auction.name}</Text>
          <Text className="text-gray-500">{auction.breed}</Text>
          <Text className="text-lg font-semibold mt-2">
            Current Bid: ${auction.currentBid}
          </Text>
          <Text className="text-gray-500 mt-1">
            Time Left: {auction.timeLeft}
          </Text>

          {/* Seller Info */}
          <HStack className="mt-4 items-center">
            <MaterialIcons
              name={auction.seller.verified ? "verified" : "person"}
              size={24}
              color={auction.seller.verified ? "#5730ef" : "#666"}
            />
            <Text className="ml-2">{auction.seller.name}</Text>
          </HStack>

          {/* Description */}
          <Text className="mt-4 text-gray-700">{auction.description}</Text>

          {/* Action Buttons */}
          <HStack className="mt-6 space-x-4">
            <Button
              className="flex-1 bg-[#5730ef] rounded-lg"
              onPress={() => {
                // Handle bid action
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
