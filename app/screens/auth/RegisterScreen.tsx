import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useLayoutEffect, useState } from "react";
import { INavigationParamList } from "../../models/navigationModel";
import { Box } from "@/app/components/ui/box";
import { Text } from "@/app/components/ui/text";

type RegisterScreenPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "Register"
>;

export default function RegisterScreen({
  navigation,
}: RegisterScreenPropsTypes) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
    });
  }, []);

  return (
    <Box>
      <Text>Register</Text>
    </Box>
  );
}
