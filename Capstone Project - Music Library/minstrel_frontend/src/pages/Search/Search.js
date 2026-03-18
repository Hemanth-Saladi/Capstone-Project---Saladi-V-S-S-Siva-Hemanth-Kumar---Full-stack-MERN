import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../services/api";
import MediaGrid from "../../components/Media/MediaGrid";

const Search = () => {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const [results, setResults] = useState({ songs: [] });

  useEffect(() => {
    if (!q) return;
    api.get(`/songs/search?q=${encodeURIComponent(q)}`)
      .then((res) => setResults(res.data))
      .catch(console.error);
  }, [q]);

  return <MediaGrid title={`Search: ${q}`} items={results.songs || []} />;
};

export default Search;