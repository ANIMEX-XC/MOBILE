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
  Input,
  InputField,
} from "@/app/components/ui";
import { MaterialIcons } from "@expo/vector-icons";

type EditProfileScreenPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "EditProfile"
>;

export default function EditProfileScreen({
  navigation,
}: EditProfileScreenPropsTypes) {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("+1234567890");
  const [location, setLocation] = useState("New York, NY");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Edit Profile",
    });
  }, [navigation]);

  const handleSave = () => {
    // Handle save action (e.g., API call to update profile)
    console.log("Profile updated:", { name, email, phone, location });
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="p-4">
        <VStack space="md">
          {/* Name Input */}
          <Input>
            <InputField
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              className="h-12"
            />
          </Input>

          {/* Email Input */}
          <Input>
            <InputField
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              className="h-12"
              keyboardType="email-address"
            />
          </Input>

          {/* Phone Input */}
          <Input>
            <InputField
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              className="h-12"
              keyboardType="phone-pad"
            />
          </Input>

          {/* Location Input */}
          <Input>
            <InputField
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
              className="h-12"
            />
          </Input>
        </VStack>

        {/* Save Button */}
        <HStack className="mt-6">
          <Button
            className="flex-1 bg-[#5730ef] rounded-lg"
            onPress={handleSave}
          >
            <ButtonText>Save Changes</ButtonText>
          </Button>
        </HStack>
      </ScrollView>
    </View>
  );
}
