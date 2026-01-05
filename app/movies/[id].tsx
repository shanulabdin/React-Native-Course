import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">
      {label}
    </Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {/* Ensure value is always a string or fallback to N/A */}
      {value !== undefined && value !== null && value !== "" ? String(value) : 'N/A'}
    </Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() => fetchMovieDetails(id as string)) as { data: any, loading: boolean };

  // 1. Handle Loading State (Prevents errors on undefined 'movie')
  if (loading) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">{movie?.title || 'No Title'}</Text>

          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date ? movie.release_date.split('-')[0] : 'Year N/A'}
            </Text>
            <Text className="text-light-200 text-sm"> • </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime || 0}m</Text>
          </View>

          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-2 mt-2 self-start">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-sm">
              ({movie?.vote_count || 0} votes)
            </Text>
          </View>

          <MovieInfo label="Overview" value={movie?.overview} />

          <MovieInfo 
            label="Genres" 
            value={movie?.genres?.map((g: any) => g.name).join(' - ') || 'N/A'} 
          />

          <View className="flex flex-row justify-between w-full">
             <MovieInfo 
                label="Budget" 
                value={movie?.budget ? `$${(movie.budget / 1_000_000).toFixed(1)}M` : 'N/A'} 
              />
             <MovieInfo 
                label="Revenue" 
                value={movie?.revenue ? `$${(movie.revenue / 1_000_000).toFixed(1)}M` : 'N/A'} 
              />
          </View>

          <MovieInfo 
            label="Production Companies" 
            value={movie?.production_companies?.map((c: any) => c.name).join(' - ') || 'N/A'} 
          />
        </View>
      </ScrollView>

      {/* Fixed: right-9 changed to right-0 and added mx-5 to center the button */}
      <TouchableOpacity 
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50" 
        onPress={() => router.back()}
      >
          <Image source={icons.arrow} className="size-5 mr-1 rotate-180" tintColor="#fff" />
          <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MovieDetails;