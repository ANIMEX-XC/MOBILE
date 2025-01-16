import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useLayoutEffect, useState } from "react";
import { INavigationParamList } from "../../models/navigationModel";
import { Box } from "@/app/components/ui/box";
import { Text } from "@/app/components/ui/text";

type HomeScreenPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "Home"
>;

export default function HomeScreen({ navigation }: HomeScreenPropsTypes) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
    });
  }, []);

  return (
    <Box>
      <Text>Home</Text>
    </Box>
  );
}
