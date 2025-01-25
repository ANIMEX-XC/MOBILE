import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import { INavigationParamList } from "../../models/navigationModel";
import { ScrollView, RefreshControl } from "react-native";
import {
  View,
  Text,
  Input,
  InputField,
  InputSlot,
  Button,
  ButtonText,
  VStack,
} from "@/app/components/ui";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/app/configs/colors";
import { HStack } from "@/app/components/ui/hstack";
import { Pressable } from "@/app/components/ui/pressable";
import { Image } from "@/app/components/ui/image";
import { Center } from "@/app/components/ui/center";
import { ProductCard } from "@/app/components";
import { useAppContext } from "@/app/context/app.context";

type HomeScreenPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "Home"
>;

type Category = {
  id: number;
  name: string;
  icon: string;
};

type AuctionItem = {
  id: number;
  name: string;
  image: string;
  currentBid: number;
  timeLeft: string;
  category: string;
};

export default function HomeScreen({ navigation }: HomeScreenPropsTypes) {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const { init } = useAppContext();

  const categories: Category[] = [
    { id: 0, name: "All", icon: "pets" },
    { id: 1, name: "Dogs", icon: "dog" },
    { id: 2, name: "Cats", icon: "cat" },
    { id: 3, name: "Birds", icon: "bird" },
    { id: 4, name: "Fish", icon: "fish" },
  ];

  const auctions: AuctionItem[] = [
    {
      id: 1,
      name: "Golden Retriever Puppy",
      image: "https://example.com/golden.jpg",
      currentBid: 1500,
      timeLeft: "2h 15m",
      category: "Dogs",
    },
    // Add more mock data as needed
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // Add your refresh logic here
    setTimeout(() => setRefreshing(false), 2000);
  };

  const featuredPets = [
    {
      id: "1",
      name: "Persian Cat",
      breed: "Persian",
      image: "https://example.com/pet.jpg",
      price: 800,
      location: "New York, NY",
      isAuction: true,
      timeLeft: "5h 30m",
      currentBid: 800,
      seller: {
        name: "Premium Pets",
        verified: true,
      },
    },
    // Add more featured pets...
  ];

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="pt-12 px-4 bg-[#5730ef]">
        <HStack className="justify-between items-center mb-4">
          <VStack>
            <Text className="text-white text-lg">Welcome Back 👋</Text>
            <Text className="text-white text-2xl font-bold">Pet Auction</Text>
          </VStack>
          {init.isAuth === true && (
            <Pressable onPress={() => navigation.navigate("Profile")}>
              <MaterialIcons name="account-circle" size={40} color="white" />
            </Pressable>
          )}
          {init.isAuth === false && (
            <Button
              className="bg-white"
              onPress={() => navigation.navigate("Login")}
            >
              <ButtonText className="text-[#5730ef]">Login</ButtonText>
            </Button>
          )}
        </HStack>

        {/* Search Bar */}
        <Input className="bg-white rounded-2xl mb-4">
          <InputSlot className="pl-4">
            <MaterialIcons name="search" size={24} color="#5730ef" />
          </InputSlot>
          <InputField className="h-12 text-base" placeholder="Search pets..." />
        </Input>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className="flex-1"
      >
        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4 py-4"
        >
          <HStack className="space-x-4">
            {categories.map((category) => (
              <Pressable
                key={category.id}
                onPress={() => setSelectedCategory(category.id)}
              >
                <View
                  className={`px-6 py-3 mx-2 rounded-xl flex items-center ${
                    selectedCategory === category.id
                      ? "bg-[#5730ef]"
                      : "bg-gray-100"
                  }`}
                >
                  <MaterialIcons
                    name={category.icon as any}
                    size={24}
                    color={
                      selectedCategory === category.id ? "white" : "#5730ef"
                    }
                  />
                  <Text
                    className={`mt-1 font-medium ${
                      selectedCategory === category.id
                        ? "text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {category.name}
                  </Text>
                </View>
              </Pressable>
            ))}
          </HStack>
        </ScrollView>

        {/* Live Auctions */}
        <View className="px-4">
          <HStack className="justify-between items-center mb-4">
            <Text className="text-xl font-bold">Live Auctions</Text>
            <Pressable onPress={() => navigation.navigate("Auction")}>
              <Text className="text-[#5730ef]">See All</Text>
            </Pressable>
          </HStack>

          <VStack className="space-y-4">
            {auctions.map((item) => (
              <Pressable
                key={item.id}
                onPress={() =>
                  navigation.navigate("DetailAuction", {
                    id: item.id.toString(),
                  })
                }
              >
                <View className="bg-gray-50 rounded-xl p-3 flex-row">
                  <Image
                    source={{ uri: item.image }}
                    alt={item.name}
                    className="w-24 h-24 rounded-lg"
                  />
                  <VStack className="ml-4 flex-1 justify-between">
                    <Text className="text-lg font-semibold">{item.name}</Text>
                    <Text className="text-gray-500">{item.category}</Text>
                    <HStack className="justify-between items-center">
                      <VStack>
                        <Text className="text-gray-500">Current Bid</Text>
                        <Text className="text-[#5730ef] font-bold">
                          ${item.currentBid}
                        </Text>
                      </VStack>
                      <HStack className="items-center space-x-1">
                        <MaterialIcons name="timer" size={16} color="#5730ef" />
                        <Text className="text-[#5730ef]">{item.timeLeft}</Text>
                      </HStack>
                    </HStack>
                  </VStack>
                </View>
              </Pressable>
            ))}
          </VStack>
        </View>

        {/* Featured Pets */}
        <View className="px-4 mt-6 mb-6">
          <HStack className="justify-between items-center mb-4">
            <Text className="text-xl font-bold">Featured Pets</Text>
            <Pressable onPress={() => navigation.navigate("Product")}>
              <Text className="text-[#5730ef]">See All</Text>
            </Pressable>
          </HStack>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <HStack className="space-x-4">
              {featuredPets.map((pet) => (
                <ProductCard
                  key={pet.id}
                  item={pet}
                  onPress={() =>
                    navigation.navigate("DetailProduct", { id: pet.id })
                  }
                  className="w-48"
                />
              ))}
            </HStack>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
