import { View, Text, VStack } from "@/app/components/ui";

import { Image } from "@/app/components/ui/image";
import { HStack } from "@/app/components/ui/hstack";
import { Pressable } from "@/app/components/ui/pressable";
import { MaterialIcons } from "@expo/vector-icons";
import { Product } from "./types/product";

type ProductCardProps = {
  item: Product;
  onPress: (id: string) => void;
  onFavoritePress?: (id: string) => void;
  className?: string;
};

export const ProductCard = ({
  item,
  onPress,
  onFavoritePress,
  className = "",
}: ProductCardProps) => {
  return (
    <Pressable
      onPress={() => onPress(item.id)}
      className={`bg-white rounded-2xl shadow-sm overflow-hidden ${className} mt-5`}
    >
      <View className="relative">
        <Image
          source={{ uri: item.image }}
          alt={item.name}
          className="w-full h-40 rounded-t-2xl"
        />
        <Pressable
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full items-center justify-center"
          onPress={() => onFavoritePress?.(item.id)}
        >
          <MaterialIcons name="favorite-border" size={20} color="#5730ef" />
        </Pressable>
        {item.isAuction && (
          <View className="absolute bottom-2 left-2 bg-[#5730ef]/90 px-2 py-1 rounded-full">
            <Text className="text-white text-xs">Live Auction</Text>
          </View>
        )}
      </View>

      <View className="p-3">
        <Text className="text-lg font-semibold" numberOfLines={1}>
          {item.name}
        </Text>
        <Text className="text-gray-500 text-sm" numberOfLines={1}>
          {item.breed}
        </Text>

        <HStack className="items-center space-x-1 mt-1">
          <MaterialIcons name="location-on" size={14} color="#666" />
          <Text className="text-gray-500 text-xs" numberOfLines={1}>
            {item.location}
          </Text>
        </HStack>

        <View className="mt-2">
          {item.isAuction ? (
            <VStack>
              <Text className="text-xs text-gray-500">Current Bid</Text>
              <HStack className="justify-between items-center">
                <Text className="text-[#5730ef] font-bold">
                  ${item.currentBid}
                </Text>
                <HStack className="items-center space-x-1">
                  <MaterialIcons name="timer" size={14} color="#5730ef" />
                  <Text className="text-[#5730ef] text-xs">
                    {item.timeLeft}
                  </Text>
                </HStack>
              </HStack>
            </VStack>
          ) : (
            <Text className="text-[#5730ef] font-bold">${item.price}</Text>
          )}
        </View>

        <HStack className="mt-2 items-center space-x-1">
          <Image
            source={{
              uri:
                item.seller.avatar || "https://example.com/default-avatar.jpg",
            }}
            alt="Seller"
            className="w-5 h-5 rounded-full"
          />
          <Text className="text-xs text-gray-500" numberOfLines={1}>
            {item.seller.name}
          </Text>
          {item.seller.verified && (
            <MaterialIcons name="verified" size={14} color="#5730ef" />
          )}
        </HStack>
      </View>
    </Pressable>
  );
};
