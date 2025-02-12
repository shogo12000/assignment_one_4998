import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import fetchingMovies from "@/assets/fetchingMovies";
import { Icon, SearchIcon } from "@/components/ui/icon";
import { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { ComboBoxConstants } from "@/constants/comboBoxContants";
import ComboBox from "@/components/ComboBox";
import { useRouter } from "expo-router";

export default function SearchResults() {
  const [borderColor, setBorderColor] = useState("silver");
  const BoxValues = ComboBoxConstants.search;
  const [comboBoxValue, setComboBoxValue] = useState(BoxValues[0].name);
  const [searchInput, setSearchInput] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [data, setData] = useState(null);
  const router = useRouter();

  const checkField = async () => {
    if (searchInput === "") {
      setBorderColor(Colors.btnColor.danger);
      setShowMessage(true);
      return;
    }
    setBorderColor("silver");
    setShowMessage(false);
    const data = await fetchingMovies.FetchSearch({
      searchInput: searchInput,
      searchType: comboBoxValue,
    });
    setData(data);
  };

  const showDetails = (userId: string, title: string, mediaType: string) => {
    router.push({
      pathname: "/detail/[id]",
      params: { id: userId, titleHeader: title, mediaType: mediaType },
    });
  };

  useEffect(() => {
  }, [data]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 20, gap: 25 }}
      >
        <View style={{ display: "flex", gap: 7 }}>
          <Text>
            Search Movie/TV Show Name
            <Text style={{ color: Colors.btnColor.danger }}>*</Text>
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              borderWidth: 2,
              borderColor: borderColor,
            }}
          >
            <SearchIcon
              style={{ marginLeft: 8 }} // Espaço entre o texto e o ícone
              width={20}
              height={20}
              color="silver"
              fill="transparent"
            />
            <TextInput
              onFocus={() => {
                borderColor == "silver" &&
                  setBorderColor(Colors.btnColor.background);
              }}
              style={{
                flex: 1,
                backgroundColor: "white",
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}
              value={searchInput}
              onChangeText={(e) => setSearchInput(e)}
            />
          </View>
        </View>
        <View>
          <Text>Choose Search Type*</Text>
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <View style={{ flex: 1 }}>
              <ComboBox
                BoxValues={BoxValues}
                setComboBoxValue={setComboBoxValue}
                comboBoxValue={comboBoxValue}
                boxStyle={{ borderWidth: 2, borderColor: borderColor }}
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.btnColor.background,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 20,
                gap: 10,
              }}
              onPress={() => checkField()}
            >
              <SearchIcon
                style={{ marginLeft: 8 }} // Espaço entre o texto e o ícone
                width={15}
                height={15}
                color="white"
                fill={Colors.btnColor.background}
              />
              <Text style={{ color: "white" }}>Search</Text>
            </TouchableOpacity>
          </View>
          {showMessage &&
            (comboBoxValue === "movie" ? (
              <Text
                style={{ paddingVertical: 10, color: Colors.btnColor.danger }}
              >
                MovieTv show name is required
              </Text>
            ) : (
              <Text
                style={{ paddingVertical: 10, color: Colors.btnColor.danger }}
              >
                Multi show name is required
              </Text>
            ))}
        </View>
        {data === null ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                width: "100%",
                textAlign: "center",
                paddingBottom: 150,
                fontSize: 23,
                fontWeight: 600,
              }}
            >
              Please initiate a search
            </Text>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <FlatList
              data={data}
              style={{ width: "100%" }}
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
                      {item.original_title
                        ? item.original_title.length > 25
                          ? item.original_title.slice(0, 20) + "..."
                          : item.original_title
                        : item.original_name}
                    </Text>
                    <Text style={{ fontWeight: 400, fontSize: 13 }}>
                      Popularity: {item.popularity}
                    </Text>
                    <Text style={{ fontWeight: 400, fontSize: 13 }}>
                      Release Date: {item.release_date}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        showDetails(
                          item.id,
                          item.original_title
                            ? item.original_title
                            : "No Name...",
                          item.media_type
                        )
                      }
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: Colors.btnColor.background,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "white",
                        }}
                      >
                        More Details
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
