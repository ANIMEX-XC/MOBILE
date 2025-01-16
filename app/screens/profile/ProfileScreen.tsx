import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useLayoutEffect, useState } from "react";
import { INavigationParamList } from "../../models/navigationModel";
import { Box } from "@/app/components/ui/box";
import { Text } from "@/app/components/ui/text";

type ProfileScreenPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "Profile"
>;

export default function ProfileScreen({ navigation }: ProfileScreenPropsTypes) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
    });
  }, []);

  return (
    <Box>
      <Text>Profile</Text>
    </Box>
  );
}
