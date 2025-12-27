import { SearchBar } from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Image, ScrollView, View } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full" />

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ minHeight: "120%", paddingBottom: 10 }}>
        <Image source={icons.logo} className="w-12 h-12 mb-20 mt-20 mx-auto" />

        <View className="mb-5 flex-1">
          <SearchBar 
            onPress={() => router.push('/search')}
            placeholder="Search movies or TV shows"
          />
        </View>
      </ScrollView>
    </View>
  );
}
