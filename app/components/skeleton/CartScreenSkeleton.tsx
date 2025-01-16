import { ScrollView } from "react-native";
import { Box } from "../ui/box";
import { HStack } from "../ui/hstack";
import { Skeleton } from "../ui/skeleton";
import { VStack } from "../ui/vstack";

export default function CartScreenSkeleton() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack space="1" rounded="md">
        {[...Array(5).keys()].map((item: number) => (
          <Box
            key={item}
            mb="2"
            p="3"
            borderWidth="1"
            borderColor="gray.100"
            backgroundColor="#FFF"
          >
            <HStack space="3" my="1">
              <VStack flex="3" space="4">
                <Skeleton.Text />
                <HStack space="2" alignItems="center">
                  <Skeleton h="8" w="20" rounded="xl" />
                  <Skeleton h="8" w="20" rounded="xl" />
                  <Skeleton h="8" w="20" rounded="xl" />
                </HStack>
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </ScrollView>
  );
}
