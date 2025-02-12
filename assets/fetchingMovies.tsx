import { useEffect } from "react";
import { API_OPTIONS_GET } from "@/components/apiConfig";

const FetchingMovies = async ({
  fetchLoading,
  fetchMovies,
  movieId,
  multi,
}: {
  fetchLoading: (load: boolean) => void;
  fetchMovies: (movies: {
    title: string;
    original_name: string;
    url: string;
    popularity: string;
    release_date: string;
    overview: string;
  }) => void;
  movieId: string | string[];
  multi?: string;
}) => {
 
  try {
    fetchLoading(true);
    const response = await fetch(
      `https://api.themoviedb.org/3/${multi}/${movieId}`,
      API_OPTIONS_GET
    );
    const data = await response.json();
    const saveData = {
      title: data.original_title,
      original_name: data.original_name,
      url: data.poster_path,
      popularity: data.popularity,
      release_date: data.release_date,
      overview: data.overview,
    };
    fetchMovies(saveData);
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
  } finally {
    fetchLoading(false);
  }
};

const FetchAllMovies = async ({
  fetchLoading,
  allMovies,
  comboBoxValue,
}: {
  fetchLoading: (load: boolean) => void;
  allMovies: (
    movies: {
      original_title: string;
      url: string;
      popularity: string;
      release_date: string;
      overview: string;
      poster_path: string;
      id: string;
    }[]
  ) => void;
  comboBoxValue: string;
}) => {
  try {
    fetchLoading(true);
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${comboBoxValue}?language=en-US&page=1`,
      API_OPTIONS_GET
    );
    const data = await response.json();
    allMovies(data.results);
  } catch (error) {
    console.error("Error Finding Movies:", error);
  } finally {
    fetchLoading(false);
  }
};

const FetchSearch = async ({
  searchInput,
  searchType,
}: {
  searchInput: string;
  searchType: string;
}) => {
  const url = `https://api.themoviedb.org/3/search/${searchType}?query=${searchInput}&include_adult=false&language=en-US&page=1`;

  try {
    const response = await fetch(url, API_OPTIONS_GET);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("error Searching Movies:", error);
    return null;
  }
};

const FetchTvSeries = async ({ listType }: { listType: string }) => {
  const url = `https://api.themoviedb.org/3/tv/${listType}?language=en-US&page=1`;
  try {
    const response = await fetch(url, API_OPTIONS_GET);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("error Searching Movies:", error);
    return null;
  }
};

export default { FetchingMovies, FetchAllMovies, FetchSearch, FetchTvSeries};
