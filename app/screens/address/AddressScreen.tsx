import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";
import { INavigationParamList } from "../../models/navigationModel";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  Input,
  InputField,
  Button,
  ButtonText,
  ScrollView,
  HStack,
  Pressable,
  VStack,
  Textarea,
  TextareaInput,
} from "@/app/components/ui";
import { MaterialIcons } from "@expo/vector-icons";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
} from "@/app/components/ui/form-control";
import { IAddress } from "@/app/models/addressModel";

type AddressScreenPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "Address"
>;

export default function AddressScreen({ navigation }: AddressScreenPropsTypes) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddress>();

  const onSubmit = (data: IAddress) => {
    console.log(data);
    // Handle form submission
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="pt-12 px-4 bg-white">
        <HStack className="justify-between items-center mb-4">
          <HStack className="items-center space-x-2">
            <Pressable onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back" size={24} color="#5730ef" />
            </Pressable>
            <Text className="text-xl font-bold">Add Address</Text>
          </HStack>
        </HStack>
      </View>

      <ScrollView className="flex-1 p-4">
        <VStack space="md">
          <FormControl isInvalid={!!errors.addressName}>
            <Controller
              name="addressName"
              control={control}
              rules={{ required: "Address name is required" }}
              render={({ field: { onChange, value } }) => (
                <Input>
                  <InputField
                    placeholder="Address Label (Home, Office, etc.)"
                    value={value}
                    onChangeText={onChange}
                    className="h-12"
                  />
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorText>
                {errors.addressName?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl isInvalid={!!errors.addressContact}>
            <Controller
              name="addressContact"
              control={control}
              rules={{ required: "Contact number is required" }}
              render={({ field: { onChange, value } }) => (
                <Input>
                  <InputField
                    placeholder="Contact Number"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="phone-pad"
                    className="h-12"
                  />
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorText>
                {errors.addressContact?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl isInvalid={!!errors.addressProvinsi}>
            <Controller
              name="addressProvinsi"
              control={control}
              rules={{ required: "Province is required" }}
              render={({ field: { onChange, value } }) => (
                <Input>
                  <InputField
                    placeholder="Province"
                    value={value}
                    onChangeText={onChange}
                    className="h-12"
                  />
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorText>
                {errors.addressProvinsi?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <HStack space="md">
            <FormControl
              isInvalid={!!errors.addressKabupaten}
              className="flex-1"
            >
              <Controller
                name="addressKabupaten"
                control={control}
                rules={{ required: "City is required" }}
                render={({ field: { onChange, value } }) => (
                  <Input>
                    <InputField
                      placeholder="City"
                      value={value}
                      onChangeText={onChange}
                      className="h-12"
                    />
                  </Input>
                )}
              />
              <FormControlError>
                <FormControlErrorText>
                  {errors.addressKabupaten?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <FormControl
              isInvalid={!!errors.addressKecamatan}
              className="flex-1"
            >
              <Controller
                name="addressKecamatan"
                control={control}
                rules={{ required: "District is required" }}
                render={({ field: { onChange, value } }) => (
                  <Input>
                    <InputField
                      placeholder="District"
                      value={value}
                      onChangeText={onChange}
                      className="h-12"
                    />
                  </Input>
                )}
              />
              <FormControlError>
                <FormControlErrorText>
                  {errors.addressKecamatan?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          </HStack>

          <FormControl isInvalid={!!errors.addressDetail}>
            <Controller
              name="addressDetail"
              control={control}
              rules={{ required: "Address detail is required" }}
              render={({ field: { onChange, value } }) => (
                <Textarea
                  size="xl"
                  isReadOnly={false}
                  isInvalid={false}
                  isDisabled={false}
                >
                  <TextareaInput placeholder="Detail Address" />
                </Textarea>
              )}
            />
            <FormControlError>
              <FormControlErrorText>
                {errors.addressDetail?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl isInvalid={!!errors.addressPostalCode}>
            <Controller
              name="addressPostalCode"
              control={control}
              rules={{ required: "Postal code is required" }}
              render={({ field: { onChange, value } }) => (
                <Input>
                  <InputField
                    placeholder="Postal Code"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="numeric"
                    className="h-12"
                  />
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorText>
                {errors.addressPostalCode?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
        </VStack>
      </ScrollView>

      {/* Submit Button */}
      <View className="p-4 bg-white border-t border-gray-100">
        <Button
          className="h-12 bg-[#5730ef] rounded-xl"
          onPress={handleSubmit(onSubmit)}
        >
          <ButtonText>Save Address</ButtonText>
        </Button>
      </View>
    </View>
  );
}
