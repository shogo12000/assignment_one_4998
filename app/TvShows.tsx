import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import ComboBox from "@/components/ComboBox";
import { ComboBoxConstants } from "@/constants/comboBoxContants";
import { useState, useEffect } from "react";
import { Link, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import fetchingMovies from "@/assets/fetchingMovies";

export default function TvShows() {
  const BoxValues = ComboBoxConstants.tvShows;
  const router = useRouter();
  const [comboBoxValue, setComboBoxValue] = useState(BoxValues[0].name);
  const [data, setData] = useState<
    {
      original_name: string;
      url: string;
      popularity: string;
      release_date: string;
      overview: string;
      poster_path: string;
      id: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetchingMovies.FetchTvSeries({
        listType: comboBoxValue,
      });
      setData(response);
    };

    fetchMovies();
  }, [comboBoxValue]);

  const showDetails = (userId: string, title: string) => {
    router.push({
      pathname: "/detail/[id]",
      params: { id: userId, titleHeader: title, mediaType: "tv" },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ paddingVertical: 20, width: 200 }}>
          <ComboBox
            BoxValues={BoxValues}
            setComboBoxValue={setComboBoxValue}
            comboBoxValue={comboBoxValue}
          />
        </View>

        <FlatList
          data={data}
          style={{ width: "100%", paddingHorizontal: 15 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                width: "100%",
                paddingVertical: 5,
              }}
            >
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                }}
                style={{ width: 100, height: 100 }}
              />
              <View style={{ display: "flex", gap: 4, flex: 1 }}>
                <Text style={{ fontWeight: 700, fontSize: 14 }}>
                  {item.original_name}
                  {/* {item.original_title.length > 25
                  ? item.original_title.slice(0, 20) + "..."
                  : item.original_title} */}
                </Text>
                <Text style={{ fontWeight: 400, fontSize: 13 }}>
                  Popularity: {item.popularity}
                </Text>
                <Text style={{ fontWeight: 400, fontSize: 13 }}>
                  Release Date: {item.release_date}
                </Text>
                <TouchableOpacity
                  onPress={() => showDetails(item.id, item.original_name)}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: Colors.btnColor.background,
                  }}
                >
                  <Text
                    style={{ fontSize: 13, fontWeight: 700, color: "white" }}
                  >
                    More Details
                  </Text>
                </TouchableOpacity>
                {/* <Link push
                       href={{ pathname: "/detail/[id]", params: { id: item.id } }}
                     >
                       <Text>teste</Text>
                     </Link> */}
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}
