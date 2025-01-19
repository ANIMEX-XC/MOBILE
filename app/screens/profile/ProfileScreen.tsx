import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import { INavigationParamList } from "../../models/navigationModel";
import { View, Text, VStack } from "@/app/components/ui";
import { MaterialIcons } from "@expo/vector-icons";

import { HStack } from "@/app/components/ui/hstack";
import { Pressable } from "@/app/components/ui/pressable";
import { Image } from "@/app/components/ui/image";
import { Divider } from "@/app/components/ui/divider";
import { ScrollView } from "@/app/components/ui/scroll-view";
import { AlertDialog } from "@/app/components/ui/alert-dialog";
import { Button } from "@/app/components/ui/button";
import { ButtonText } from "@/app/components/ui";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Icon,
  CloseIcon,
  Heading,
} from "@/app/components/ui";

type ProfileScreenPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "Profile"
>;

type MenuItemProps = {
  icon: string;
  title: string;
  onPress?: () => void;
  showBadge?: boolean;
  badgeText?: string;
};

const MenuItem = ({
  icon,
  title,
  onPress,
  showBadge,
  badgeText,
}: MenuItemProps) => (
  <Pressable onPress={onPress}>
    <HStack className="px-4 py-4 items-center justify-between">
      <HStack className="items-center space-x-3">
        <View className="w-10 h-10 bg-[#5730ef]/10 rounded-full items-center justify-center">
          <MaterialIcons name={icon as any} size={24} color="#5730ef" />
        </View>
        <Text className="text-base font-medium px-5">{title}</Text>
      </HStack>
      <HStack className="items-center space-x-2">
        {showBadge && (
          <View className="px-2 py-1 bg-[#5730ef]/10 rounded-full">
            <Text className="text-xs text-[#5730ef]">{badgeText}</Text>
          </View>
        )}
        <MaterialIcons name="chevron-right" size={24} color="#666" />
      </HStack>
    </HStack>
  </Pressable>
);

export default function ProfileScreen({ navigation }: ProfileScreenPropsTypes) {
  const userLevel = "Gold"; // Replace with actual user level from your state management
  const userName = "John Doe"; // Replace with actual user name
  const userEmail = "john.doe@example.com"; // Replace with actual user email

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Silver":
        return "bg-gray-200";
      case "Gold":
        return "bg-yellow-100";
      case "Platinum":
        return "bg-blue-100";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="pt-12 px-4 bg-[#5730ef]">
        <HStack className="justify-between items-center mb-4">
          <Text className="text-white text-xl font-bold">Profile</Text>
          <HStack space="sm" className="space-x-4 items-center">
            <Pressable
              onPress={() => navigation.navigate("MyProduct")}
              className="bg-white/20 px-3 py-1.5 rounded-full"
            >
              <HStack className="items-center space-x-1">
                <MaterialIcons name="pets" size={18} color="white" />
                <Text className="text-white text-sm mx-5">My Products</Text>
              </HStack>
            </Pressable>
            <Pressable
            // onPress={() => navigation.navigate("Settings")}
            >
              <MaterialIcons name="settings" size={24} color="white" />
            </Pressable>
          </HStack>
        </HStack>

        {/* Wallet Balance Card */}
        <View className="bg-white/10 rounded-2xl p-4 mb-6">
          <HStack className="items-center justify-between">
            <VStack>
              <Text className="text-white/80 text-sm">Total Balance</Text>
              <Text className="text-white text-2xl font-bold">$12,500.00</Text>
            </VStack>
            <HStack space="md" className="space-x-5">
              <Pressable
                // onPress={() => navigation.navigate("TopUp")}
                className="bg-white/20 p-2 rounded-full"
              >
                <MaterialIcons name="add" size={24} color="white" />
              </Pressable>
              <Pressable
                // onPress={() => navigation.navigate("Withdraw")}
                className="bg-white/20 p-2 rounded-full"
              >
                <MaterialIcons
                  name="account-balance-wallet"
                  size={24}
                  color="white"
                />
              </Pressable>
            </HStack>
          </HStack>

          {/* Transaction Summary */}
          <HStack className="mt-4 justify-between">
            <VStack className="items-center">
              <HStack className="items-center space-x-1">
                <MaterialIcons
                  name="arrow-downward"
                  size={16}
                  color="#4ADE80"
                />
                <Text className="text-white/80 text-sm">Income</Text>
              </HStack>
              <Text className="text-white font-medium">$8,500</Text>
            </VStack>
            <VStack className="items-center">
              <HStack className="items-center space-x-1">
                <MaterialIcons name="arrow-upward" size={16} color="#FF4B4B" />
                <Text className="text-white/80 text-sm">Spending</Text>
              </HStack>
              <Text className="text-white font-medium">$4,000</Text>
            </VStack>
            <VStack className="items-center">
              <HStack className="items-center space-x-1">
                <MaterialIcons name="pending" size={16} color="#FFB800" />
                <Text className="text-white/80 text-sm">Pending</Text>
              </HStack>
              <Text className="text-white font-medium">$2,300</Text>
            </VStack>
          </HStack>
        </View>
      </View>

      {/* Profile Card */}
      <View className="px-4 -mt-4">
        <View className="bg-white rounded-2xl p-4 shadow-sm">
          <HStack className="items-center space-x-4">
            <Image
              source={{ uri: "https://example.com/avatar.jpg" }}
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
            <VStack className="flex-1">
              <Text className="text-xl font-bold">{userName}</Text>
              <Text className="text-gray-500">{userEmail}</Text>
              <HStack className="items-center space-x-2 mt-1">
                <MaterialIcons name="emoji-events" size={20} color="#FFD700" />
                <View
                  className={`px-3 py-1 rounded-full ${getLevelColor(
                    userLevel
                  )}`}
                >
                  <Text className="text-sm font-medium">
                    {userLevel} Member
                  </Text>
                </View>
              </HStack>
            </VStack>
          </HStack>

          {/* Stats */}
          <HStack className="justify-between mt-4 px-4 py-3 bg-gray-50 rounded-xl">
            <VStack className="items-center">
              <Text className="text-lg font-bold text-[#5730ef]">12</Text>
              <Text className="text-gray-500">Orders</Text>
            </VStack>
            <VStack className="items-center">
              <Text className="text-lg font-bold text-[#5730ef]">3</Text>
              <Text className="text-gray-500">Active Bids</Text>
            </VStack>
            <VStack className="items-center">
              <Text className="text-lg font-bold text-[#5730ef]">5</Text>
              <Text className="text-gray-500">Won Auctions</Text>
            </VStack>
          </HStack>
        </View>
      </View>

      {/* Menu Items */}
      <ScrollView className="mt-4">
        <VStack>
          <MenuItem
            icon="edit"
            title="Edit Profile"
            // onPress={() => navigation.navigate("EditProfile")}
          />
          <Divider />
          <MenuItem
            icon="verified-user"
            title="KYC Verification"
            // onPress={() => navigation.navigate("KYC")}
            showBadge
            badgeText="Verify Now"
          />
          <Divider />
          <MenuItem
            icon="shopping-bag"
            title="My Orders"
            onPress={() => navigation.navigate("Order")}
            showBadge
            badgeText="2 Active"
          />
          <Divider />
          <MenuItem
            icon="location-on"
            title="My Addresses"
            onPress={() => navigation.navigate("Address")}
          />
          <Divider />
          <MenuItem
            icon="gavel"
            title="My Auctions"
            // onPress={() => navigation.navigate("MyAuctions")}
          />
          <Divider />
          <MenuItem
            icon="favorite"
            title="Watchlist"
            // onPress={() => navigation.navigate("Watchlist")}
          />
          <Divider />
          <MenuItem
            icon="help"
            title="Help & Support"
            // onPress={() => navigation.navigate("Support")}
          />
          <Divider />
          <MenuItem
            icon="logout"
            title="Logout"
            onPress={() => setShowLogoutModal(true)}
          />
        </VStack>
      </ScrollView>

      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        size="md"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="md">Logout</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} size="md" />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text>Are you sure you want to logout?</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              onPress={() => setShowLogoutModal(false)}
              className="mr-2"
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              onPress={() => {
                setShowLogoutModal(false);
                navigation.navigate("Login");
              }}
            >
              <ButtonText>Logout</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </View>
  );
}
