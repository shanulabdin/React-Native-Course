import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { Stack, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const { data: movie, loading } = useFetch(() => fetchMovieDetails(id as string));

  return (
<View className="flex-1 bg-primary">
  <Stack.Screen options={{ headerShown: false }} />
  
  <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
    <View>
      {/* Fixed: Added second slash to https:// */}
      <Image 
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`}} 
        className="w-full h-[550px]" 
        resizeMode="stretch" 
      />
    </View>

    {/* Fixed: items-start (added the 's') */}
    <View className="flex-col items-start justify-center mt-5 px-5">
      <Text className="text-white font-bold text-xl">{movie?.title}</Text>

      <View className="flex-row items-center gap-x-1 mt-2">
        <Text className="text-light-200 text-sm">{movie?.release_date?.split('-')[0]}</Text>
        <Text className="text-light-200 text-sm"> • </Text> {/* Optional: added a separator */}
        <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
      </View>

      {/* Fixed: Added self-start to wrap background to content */}
      <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-2 mt-2 self-start">
        <Image source={icons.star} className="size-4" />
        <Text className="text-white font-bold text-sm">
          {Math.round(movie?.vote_average ?? 0)}/10
        </Text>
        <Text className="text-light-200 text-sm">
          ({movie?.vote_count} votes)
        </Text>
      </View>
    </View>
  </ScrollView>
</View>
  );
}

export default MovieDetails;