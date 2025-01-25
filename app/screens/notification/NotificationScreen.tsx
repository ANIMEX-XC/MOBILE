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
} from "@/app/components/ui";
import { MaterialIcons } from "@expo/vector-icons";

type NotificationScreenPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "Notification"
>;

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
}

export default function NotificationScreen({
  navigation,
}: NotificationScreenPropsTypes) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Bid Placed",
      message: "Someone has placed a bid on your auction item.",
      date: "2024-03-15",
    },
    {
      id: "2",
      title: "Auction Ending Soon",
      message: "Your auction for the Golden Retriever is ending in 1 hour.",
      date: "2024-03-15",
    },
    {
      id: "3",
      title: "Item Sold",
      message: "Congratulations! Your item has been sold.",
      date: "2024-03-14",
    },
    // Add more notifications...
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Notifications",
    });
  }, [navigation]);

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView>
        {notifications.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <MaterialIcons name="notifications" size={48} color="#ccc" />
            <Text className="text-gray-400 mt-4">No notifications found</Text>
          </View>
        ) : (
          notifications.map((notification) => (
            <Pressable
              key={notification.id}
              className="p-4 border-b border-gray-200"
              onPress={() => {
                // Handle notification click
                console.log(`Notification clicked: ${notification.id}`);
              }}
            >
              <VStack>
                <Text className="font-semibold">{notification.title}</Text>
                <Text className="text-gray-600">{notification.message}</Text>
                <Text className="text-gray-400 text-sm">
                  {notification.date}
                </Text>
              </VStack>
            </Pressable>
          ))
        )}
      </ScrollView>
    </View>
  );
}
