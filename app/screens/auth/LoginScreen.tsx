import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import { INavigationParamList } from "../../models/navigationModel";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/app/schemas/authShema";
import { IUserLoginRequestModel } from "@/app/models/userModel";
import {
  View,
  Text,
  VStack,
  Input,
  InputField,
  InputSlot,
  Button,
  ButtonText,
} from "@/app/components/ui";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
} from "@/app/components/ui/form-control";
import { MaterialIcons } from "@expo/vector-icons";
import { Center } from "@/app/components/ui/center";
import { Image } from "@/app/components/ui/image";
import { Heading } from "@/app/components/ui/heading";
import { COLORS } from "@/app/configs/colors";

type LoginScreenPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "Login"
>;

export default function LoginScreen({ navigation }: LoginScreenPropsTypes) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userName: "",
      userPassword: "",
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onSubmit = (data: IUserLoginRequestModel) => {
    console.log(data);
  };

  return (
    <View className="flex-1 bg-white justify-center px-4">
      <Center className="mb-8">
        {/* <Image
          source={require("@/assets/logo.png")}
          alt="App Logo"
          className="w-32 h-32 mb-4"
        /> */}
        <Heading className="text-2xl font-bold text-[#5730ef] mb-2">
          Welcome Back
        </Heading>
        <Text className="text-sm text-gray-500">Sign in to continue</Text>
      </Center>

      <VStack className="space-y-4 mb-6">
        <FormControl isInvalid={!!errors.userName}>
          <Controller
            name="userName"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input size="xl" className="border rounded-lg bg-gray-50 my-2">
                <InputSlot className="pl-3">
                  <MaterialIcons
                    name="person-outline"
                    size={20}
                    color={COLORS.primary}
                  />
                </InputSlot>
                <InputField
                  className="h-16 text-base"
                  placeholder="Username"
                  value={value}
                  onChangeText={onChange}
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorText>
              {errors.userName?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl isInvalid={!!errors.userPassword}>
          <Controller
            name="userPassword"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input size="xl" className="border rounded-lg bg-gray-50 my-2">
                <InputSlot className="pl-3">
                  <MaterialIcons
                    name="lock-outline"
                    size={20}
                    color={COLORS.primary}
                  />
                </InputSlot>
                <InputField
                  className="h-16 text-base"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={value}
                  onChangeText={onChange}
                />
                <InputSlot
                  className="pr-3"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={20}
                    color={COLORS.primary}
                  />
                </InputSlot>
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorText>
              {errors.userPassword?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
      </VStack>

      <Button
        className="h-12 bg-[#5730ef] rounded-lg mb-4"
        onPress={handleSubmit(onSubmit)}
      >
        <ButtonText className="text-white font-semibold">Sign In</ButtonText>
      </Button>

      <Center className="flex-row space-x-1">
        <Text className="text-gray-500">Don't have an account?</Text>
        <Text
          className="text-[#5730ef] font-bold"
          onPress={() => navigation.navigate("Register")}
        >
          Sign Up
        </Text>
      </Center>
    </View>
  );
}
