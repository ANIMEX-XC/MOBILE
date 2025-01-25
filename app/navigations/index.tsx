import React, { useEffect, useState } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useAuthToken } from "../hooks/token";
import { useAppContext } from "../context/app.context";
import StackNavigations from "./stackNavigation";
import { useHttp } from "../hooks/useHttp";
import { Text } from "../components/ui/text";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(238, 77, 45)",
  },
};

export default function AppNavigations() {
  const { init, setInit } = useAppContext();
  const { getToken } = useAuthToken();
  const [isLoading, setIsLoading] = useState(true);

  const initApp = async () => {
    setIsLoading(true);
    try {
      const token = await getToken();
      const isAuth = token !== null;

      setInit({
        ...init,
        isAuth: isAuth,
      });
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initApp();
  }, []);

  if (isLoading) return <Text className="text-center">Loading...</Text>;

  return (
    <NavigationContainer theme={MyTheme}>
      <StackNavigations />
    </NavigationContainer>
  );
}
