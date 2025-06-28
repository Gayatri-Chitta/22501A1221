import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchStats } from "../services/api";

export default function RedirectPage() {
  const { code } = useParams();

  useEffect(() => {
    // grab all stored links (localStorage stub) and find a match
    fetchStats().then((rows) => {
      const match = rows.find((r) => r.shortcode === code);
      if (match) {
        window.location.replace(match.destination); // 🚀 send to real site
      } else {
        // no match – just send home or show 404
        window.location.replace("/");
      }
    });
  }, [code]);

  return null; // nothing visible – instant redirect
}