import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { Dimensions } from "react-native";
 
import fetchingMovies from "@/assets/fetchingMovies";

export default function UserDetails() {
  const { id, titleHeader, mediaType } = useLocalSearchParams();
  const screenWidth = Dimensions.get("window").width;
  const navigation = useNavigation();
  const [movies, setMovies] = useState<{
    title: string;
    original_name: string;
    url: string;
    popularity: string;
    release_date: string;
    overview: string;
  }>({ title: "", original_name:"", url: "", popularity: "", release_date: "", overview: "" });
  const [loading, setLoading] = useState(true);
 
 
  useEffect(() => {
    navigation.setOptions({title: titleHeader, headerBackTitle: "Back"  })
    const fetchMovies = async () => { 
      await fetchingMovies.FetchingMovies({
        fetchLoading: setLoading,
        fetchMovies: setMovies,
        movieId: id,
        multi: mediaType === "tv"?"tv":"movie",
      });
 
    };

    fetchMovies();
  }, [id]);

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      {loading ? (
        <View>
          <Text>Loading Movie</Text>
        </View>
      ) : (
        <View style={{display: "flex", justifyContent:"center", alignItems: "center", gap: 15, paddingHorizontal: 15, width: "100%"}}>
          <Text style={{ fontSize: 24, fontWeight: "700", textAlign:"center"}}>
            {movies.title} {movies.original_name}
          </Text>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${movies.url}`,
            }}
            style={{ width: screenWidth, height: screenWidth, paddingHorizontal: 15 }}
          />

          <Text  >{movies.overview}</Text>
 
          <View style={{ flexDirection: "row",   width: "100%", gap: 15}}>
            <Text>Popularity: {movies.popularity}</Text>
            <Text>Release date: {movies.release_date}</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
