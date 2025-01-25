import React, { useEffect, useRef, useState } from "react";
import {
  Feather,
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { heightPercentage } from "../utilities/dimension";
import { INavigationParamList } from "../models/navigationModel";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import { useHttp } from "../hooks/useHttp";
import { useAppContext } from "../context/app.context";
import { COLORS } from "../configs/colors";
import HomeScreen from "../screens/home/HomeScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import ProductScreen from "../screens/product/ProductScreen";
import AuctionScreen from "../screens/auction/AuctionScreen";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
      console.log("existingStatus", existingStatus);
    }

    if (finalStatus !== "granted") {
      alert("Beri izin aplikasi ini untuk mengirim notifikasi");
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      showBadge: true,
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FE9018",
    });
  }

  return token;
}

const Tab = createBottomTabNavigator<INavigationParamList>();

export function TabNavigation() {
  const navigation: INavigationParamList = useNavigation();
  const { init } = useAppContext();

  const notificationListener: any = useRef();
  const responseListener: any = useRef();

  const { handleUpdateRequest } = useHttp();

  const handleUpdatePushToken = async (fcmId: string | undefined) => {
    try {
      // await handleUpdateRequest({
      //   path: "/notifications/push-token",
      //   body: {
      //     userFcmId: fcmId,
      //   },
      // });
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (init.isAuth) {
        handleUpdatePushToken(token);
      }
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) =>
        console.log(notification)
      );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const {
          notification: {
            request: {
              content: {
                data: { screen },
              },
            },
          },
        } = response;

        // When the user taps on the notification, this line checks if they //are suppose to be taken to a particular screen
        if (screen) {
          // navigation.navigate(screen)
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { minHeight: heightPercentage(7) },
        // headerRight: () =>
        //   init.isAuth ? (
        //     <HStack mx={8} space={3} alignItems="center">
        //       {/* <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
        //         <Box alignItems="center">
        //           <MaterialIcons
        //             name="add-shopping-cart"
        //             size={30}
        //             color={COLORS.gray}
        //           />
        //         </Box>
        //       </TouchableOpacity> */}

        //       <BadgeNotificationStyle
        //         value={0}
        //         onPress={() => navigation.navigate("Notification")}
        //       />
        //     </HStack>
        //   ) : (
        //     <HStack mx={5} space={3} alignItems="center">
        //       <Button
        //         onPress={() => navigation.navigate("Login")}
        //         variant={"outline"}
        //         colorScheme={"blue"}
        //       >
        //         Login
        //       </Button>
        //     </HStack>
        //   ),
        tabBarIcon: ({ color }) => {
          switch (route.name) {
            case "Home":
              return <Feather name="home" size={25} color={color} />;
            case "Auction":
              return (
                <MaterialCommunityIcons name="fire" size={28} color={color} />
              );
            case "Product":
              return <Feather name="shopping-bag" size={25} color={color} />;

            case "Profile":
              return <AntDesign name="user" size={30} color={color} />;
            default:
              break;
          }
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
      })}
    >
      <Tab.Screen
        name="Home"
        options={{ tabBarLabel: "Home" }}
        component={HomeScreen}
      />

      <Tab.Screen
        name="Auction"
        options={{ tabBarLabel: "Auction" }}
        component={AuctionScreen}
      />

      <Tab.Screen
        name="Product"
        options={{ tabBarLabel: "Product" }}
        component={ProductScreen}
      />

      {init.isAuth === true && (
        <>
          <Tab.Screen
            name="Profile"
            options={{ tabBarLabel: "My Profile" }}
            component={ProfileScreen}
          />
        </>
      )}
    </Tab.Navigator>
  );
}

// interface IBadgeTypes {
//   value: number;
//   onPress: () => void;
// }

// function BadgeNotificationStyle({ value, onPress }: IBadgeTypes) {
//   return (
//     <TouchableOpacity onPress={onPress}>
//       <Box alignItems="center">
//         <VStack>
//           {/* <Badge
//             colorScheme='danger'
//             rounded='full'
//             mb={-4}
//             mr={-4}
//             zIndex={1}
//             variant='solid'
//             alignSelf='flex-end'
//             _text={{
//               fontSize: 10
//             }}
//           >
//             {value}
//           </Badge> */}
//           <Ionicons
//             name="notifications-outline"
//             size={30}
//             color={COLORS.gray}
//           />
//         </VStack>
//       </Box>
//     </TouchableOpacity>
//   );
// }
