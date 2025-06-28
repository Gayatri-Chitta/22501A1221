import { useEffect, useState } from "react";
import { fetchStats } from "../services/api";
import URLStatsTable from "../components/URLStatsTable";

export default function StatisticsPage() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats()
      .then(setRows)
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  return <URLStatsTable rows={rows} />;
}