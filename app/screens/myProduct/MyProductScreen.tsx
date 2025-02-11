import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useLayoutEffect, useState } from "react";
import { INavigationParamList } from "../../models/navigationModel";
import { View, Text, Input, InputField, InputSlot } from "@/app/components/ui";
import { MaterialIcons } from "@expo/vector-icons";
import { FlatList } from "react-native";
import { ProductCard } from "@/app/components/ProductCard";
import { Product } from "@/app/components/types/product";
import { HStack } from "@/app/components/ui/hstack";
import { Pressable } from "@/app/components/ui/pressable";
import { ScrollView } from "@/app/components/ui/scroll-view";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ButtonText,
} from "@/app/components/ui";
import { productData } from "@/app/constants/products";

type MyProductScreenPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "MyProduct"
>;

export default function MyProductScreen({
  navigation,
}: MyProductScreenPropsTypes) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [myProducts, setMyProducts] = useState<Product[]>([]); // Replace with your data

  const categories = [
    { id: "all", name: "All Pets", icon: "pets" },
    { id: "active", name: "Active", icon: "check-circle" },
    { id: "draft", name: "Drafts", icon: "edit" },
    { id: "sold", name: "Sold", icon: "sell" },
    { id: "archived", name: "Archived", icon: "archive" },
  ];

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  const handleProductPress = (id: string) => {
    // navigation.navigate("EditProduct", { id });
  };

  const handleDeleteProduct = (id: string) => {
    setSelectedProductId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedProductId) {
      // Call your delete function here
      console.log(`Product with ID ${selectedProductId} deleted.`);
      // Close the modal
      setShowDeleteModal(false);
      setSelectedProductId(null);
      setMyProducts(
        myProducts.filter((product) => product.id !== selectedProductId)
      );
    }
  };

  useEffect(() => {
    setMyProducts(productData);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "My Products",
    });
  }, [navigation]);

  return (
    <View className="flex-1 bg-gray-50">
      <View className="pt-8 px-4 bg-white">
        <Input className="bg-gray-50 rounded-xl mb-4">
          <InputSlot className="pl-3">
            <MaterialIcons name="search" size={20} color="#666" />
          </InputSlot>
          <InputField placeholder="Search..." size="xl" />
        </Input>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          <HStack className="space-x-3" space="sm">
            {categories.map((category) => (
              <Pressable
                key={category.id}
                onPress={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full flex-row items-center space-x-2 ${
                  selectedCategory === category.id
                    ? "bg-[#5730ef]"
                    : "bg-gray-100"
                }`}
              >
                <MaterialIcons
                  name={category.icon as any}
                  size={18}
                  color={selectedCategory === category.id ? "white" : "#666"}
                />
                <Text
                  className={`${
                    selectedCategory === category.id
                      ? "text-white"
                      : "text-gray-700"
                  }`}
                >
                  {category.name}
                </Text>
              </Pressable>
            ))}
          </HStack>
        </ScrollView>
      </View>

      {/* Product Grid */}
      <FlatList
        data={myProducts}
        renderItem={({ item }) => (
          <View className="relative w-[48%]">
            <ProductCard
              item={item}
              onPress={handleProductPress}
              className="w-full"
            />
            <HStack space="sm" className="absolute top-2 left-2 space-x-2">
              <Pressable
                onPress={() => handleDeleteProduct(item.id)}
                className="w-8 h-8 bg-red-500/90 rounded-full items-center justify-center"
              >
                <MaterialIcons name="delete" size={18} color="white" />
              </Pressable>
              <Pressable
                onPress={() =>
                  navigation.navigate("EditMyProduct", { id: item.id })
                }
                className="w-8 h-8 bg-[#5730ef]/90 rounded-full items-center justify-center"
              >
                <MaterialIcons name="edit" size={18} color="white" />
              </Pressable>
            </HStack>
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Confirmation Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody>
            <Text>Are you sure you want to delete this product?</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onPress={() => setShowDeleteModal(false)}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button onPress={confirmDelete}>
              <ButtonText>Delete</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Add Floating Action Button */}
      <Pressable
        onPress={() => navigation.navigate("CreateMyProduct")}
        className="absolute bottom-6 right-6 w-14 h-14 bg-[#5730ef] rounded-full items-center justify-center shadow-lg"
      >
        <MaterialIcons name="add" size={30} color="white" />
      </Pressable>
    </View>
  );
}
