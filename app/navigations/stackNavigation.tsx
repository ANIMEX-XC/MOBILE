import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppContext } from "../context/app.context";
import { INavigationParamList } from "../models/navigationModel";
import { TabNavigation } from "./tabNavigation";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import MyProductScreen from "../screens/myProduct/ProductScreen";
import CreateProductScreen from "../screens/myProduct/CreateProductScreen";
import AddressScreen from "../screens/address/AddressScreen";
import OrderScreen from "../screens/orders/OrderScreen";

const Stack = createNativeStackNavigator<INavigationParamList>();

export default function StackNavigations() {
  const { init } = useAppContext();

  return (
    <Stack.Navigator initialRouteName="Main">
      {init.isAuth === false && (
        <>
          <Stack.Screen
            name="Main"
            component={TabNavigation}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}

      {init.isAuth === true && (
        <>
          <Stack.Screen
            name="Main"
            component={TabNavigation}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="MyProduct" component={MyProductScreen} />
          <Stack.Screen name="CreateProduct" component={CreateProductScreen} />
          <Stack.Screen name="Address" component={AddressScreen} />
          <Stack.Screen name="Order" component={OrderScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
