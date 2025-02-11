import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import { INavigationParamList } from "../../models/navigationModel";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "@/app/schemas/authShema";
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
import { Center } from "@/app/components/ui/center";
import { Heading } from "@/app/components/ui/heading";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
} from "@/app/components/ui/form-control";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/app/configs/colors";
import { useHttp } from "@/app/hooks/useHttp";

type RegisterScreenPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "Register"
>;

export default function RegisterScreen({
  navigation,
}: RegisterScreenPropsTypes) {
  const { handlePostRequest } = useHttp();

  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userRole: "User",
    },
  });

  const onSubmit = async (payload: RegisterFormData) => {
    try {
      await handlePostRequest({
        path: "/users/register",
        body: payload,
      });

      navigation.navigate("Login");
    } catch (error: any) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View className="flex-1 bg-white justify-center px-6">
      <Center className="mb-8">
        <Heading className="text-2xl font-bold text-[#5730ef] mb-2">
          Create Account
        </Heading>
        <Text className="text-sm text-gray-500">Sign up to get started</Text>
      </Center>

      <VStack className="space-y-4 mb-6">
        <FormControl isInvalid={!!errors.userName}>
          <Controller
            name="userName"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input size="xl" className="border rounded-xl bg-gray-50 my-2">
                <InputSlot className="pl-4">
                  <MaterialIcons
                    name="person-outline"
                    size={24}
                    color={COLORS.primary}
                  />
                </InputSlot>
                <InputField
                  className="h-14 text-lg px-2"
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

        <FormControl isInvalid={!!errors.userContact}>
          <Controller
            name="userContact"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input size="xl" className="border rounded-xl bg-gray-50 my-2">
                <InputSlot className="pl-4">
                  <MaterialIcons
                    name="phone"
                    size={24}
                    color={COLORS.primary}
                  />
                </InputSlot>
                <InputField
                  className="h-14 text-lg px-2"
                  placeholder="Contact Number"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="phone-pad"
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorText>
              {errors.userContact?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl isInvalid={!!errors.userPassword}>
          <Controller
            name="userPassword"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input size="xl" className="border rounded-xl bg-gray-50 my-2">
                <InputSlot className="pl-4">
                  <MaterialIcons
                    name="lock-outline"
                    size={24}
                    color={COLORS.primary}
                  />
                </InputSlot>
                <InputField
                  className="h-14 text-lg px-2"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={value}
                  onChangeText={onChange}
                />
                <InputSlot
                  className="pr-4"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={24}
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
        className="h-14 bg-[#5730ef] rounded-xl mb-4"
        onPress={handleSubmit(onSubmit)}
      >
        <ButtonText className="text-white font-semibold text-lg">
          Create Account
        </ButtonText>
      </Button>

      <Center className="flex-row space-x-1">
        <Text className="text-gray-500">Already have an account? </Text>
        <Text
          className="text-[#5730ef] font-bold"
          onPress={() => navigation.navigate("Login")}
        >
          Sign In
        </Text>
      </Center>
    </View>
  );
}
