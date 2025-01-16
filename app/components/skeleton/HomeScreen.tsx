import CardSkeleton from "./CardProductSkeleton";
import { widthPercentage } from "../../utilities/dimension";
import { Skeleton } from "../ui/skeleton";
import { HStack } from "../ui/hstack/index.web";

export default function HomeSceenSkeleton() {
  return (
    <>
      <Skeleton
        h="32"
        width={widthPercentage(100)}
        px="2"
        my="2"
        rounded="md"
      />
      <HStack flexWrap={"wrap"} space={2}>
        {[1, 2, 3, 4, 5].map((item) => (
          <CardSkeleton key={item} />
        ))}
      </HStack>
    </>
  );
}
