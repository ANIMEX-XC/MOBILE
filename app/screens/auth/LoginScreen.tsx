import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useLayoutEffect, useState } from "react";
import { INavigationParamList } from "../../models/navigationModel";
import { Box } from "@/app/components/ui/box";
import { Text } from "@/app/components/ui/text";

type LoginScreenPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "Login"
>;

export default function LoginScreen({ navigation }: LoginScreenPropsTypes) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
    });
  }, []);

  return (
    <Box>
      <Text>Login</Text>
    </Box>
  );
}
