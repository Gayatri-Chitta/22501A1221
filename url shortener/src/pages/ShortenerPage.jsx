import { useState } from "react";
import URLShortenerForm from "../components/URLShortenerForm";
import URLList from "../components/URLList";

export default function ShortenerPage() {
  const [links, setLinks] = useState([]);
  return (
    <>
      <URLShortenerForm onSuccess={setLinks} />
      <URLList data={links} />
    </>
  );
}