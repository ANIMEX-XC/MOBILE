import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import { INavigationParamList } from "../../models/navigationModel";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProductSchema,
  CreateProductFormData,
} from "@/app/schemas/createProductSchema";
import {
  View,
  Text,
  Input,
  InputField,
  Button,
  ButtonText,
  ScrollView,
  Select,
  SelectTrigger,
  SelectInput,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
  HStack,
  Pressable,
  Image,
  VStack,
} from "@/app/components/ui";
import { Textarea, TextareaInput } from "@/app/components/ui/textarea";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
} from "@/app/components/ui/form-control";

type CreateMyProductScreenPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "CreateMyProduct"
>;

export default function CreateMyProductScreen({
  navigation,
}: CreateMyProductScreenPropsTypes) {
  const [images, setImages] = useState<any[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
  });

  const onSubmit = (data: CreateProductFormData) => {
    console.log(data);
    // Handle form submission
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets]);
    }
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
            <Text className="text-xl font-bold">Create Listing</Text>
          </HStack>
        </HStack>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Images */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-2">Product Images</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <HStack space={"sm"} className="space-x-2 py-5">
              <Pressable
                onPress={pickImage}
                className="w-24 h-24 bg-gray-100 rounded-xl items-center justify-center border-2 border-dashed border-gray-300"
              >
                <MaterialIcons
                  name="add-photo-alternate"
                  size={32}
                  color="#666"
                />
              </Pressable>
              {images.map((image, index) => (
                <View key={index} className="relative ">
                  <Image
                    source={{ uri: image.uri }}
                    alt={`Image ${index + 1}`}
                    className="w-24 h-24 rounded-xl"
                  />
                  <Pressable
                    onPress={() =>
                      setImages(images.filter((_, i) => i !== index))
                    }
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6 items-center justify-center"
                  >
                    <MaterialIcons name="close" size={16} color="white" />
                  </Pressable>
                </View>
              ))}
            </HStack>
          </ScrollView>
        </View>

        {/* Form Fields */}
        <VStack space={"sm"}>
          <FormControl isInvalid={!!errors.productName}>
            <Controller
              name="productName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input>
                  <InputField
                    size="xl"
                    placeholder="Product Name"
                    value={value}
                    onChangeText={onChange}
                    className="h-12"
                  />
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorText>
                {errors.productName?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl isInvalid={!!errors.productDescription}>
            <Controller
              name="productDescription"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Textarea size="md">
                  <TextareaInput
                    value={value!}
                    onChangeText={onChange}
                    placeholder="Once upon a time..."
                  />
                </Textarea>
              )}
            />
            <FormControlError>
              <FormControlErrorText>
                {errors.productDescription?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl isInvalid={!!errors.productTransactionType}>
            <Controller
              name="productTransactionType"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select selectedValue={value} onValueChange={onChange}>
                  <SelectTrigger>
                    <SelectInput
                      className="h-12"
                      placeholder="Select Transaction Type"
                    />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      <SelectItem label="Sell" value="Sell" />
                      <SelectItem label="Auction" value="Auction" />
                      <SelectItem label="Barter" value="Barter" />
                      <SelectItem
                        label="Purchase Order"
                        value="PurchaseOrder"
                      />
                    </SelectContent>
                  </SelectPortal>
                </Select>
              )}
            />
            <FormControlError>
              <FormControlErrorText>
                {errors.productTransactionType?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <HStack space={"sm"}>
            <FormControl isInvalid={!!errors.productPrice} className="flex-1">
              <Controller
                name="productPrice"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input>
                    <InputField
                      size="xl"
                      placeholder="Price"
                      keyboardType="numeric"
                      value={value?.toString()}
                      onChangeText={(text) => onChange(parseFloat(text) || 0)}
                      className="h-12"
                    />
                  </Input>
                )}
              />
              <FormControlError>
                <FormControlErrorText>
                  {errors.productPrice?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <FormControl isInvalid={!!errors.productWeight} className="flex-1">
              <Controller
                name="productWeight"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input>
                    <InputField
                      size="xl"
                      placeholder="Weight (kg)"
                      keyboardType="numeric"
                      value={value?.toString()}
                      onChangeText={(text) => onChange(parseFloat(text) || 0)}
                      className="h-12"
                    />
                  </Input>
                )}
              />
              <FormControlError>
                <FormControlErrorText>
                  {errors.productWeight?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          </HStack>
        </VStack>
      </ScrollView>

      {/* Submit Button */}
      <View className="p-4 bg-white border-t border-gray-100">
        <Button
          className="h-12 bg-[#5730ef] rounded-xl"
          onPress={handleSubmit(onSubmit)}
        >
          <ButtonText>Create Listing</ButtonText>
        </Button>
      </View>
    </View>
  );
}
