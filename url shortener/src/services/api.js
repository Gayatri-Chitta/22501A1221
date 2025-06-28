import { nanoid } from "nanoid";

const STORE_KEY = "url‑app‑links";

function read() {
  return JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
}
function write(data) {
  localStorage.setItem(STORE_KEY, JSON.stringify(data));
}

// Mimic POST /shorten – accepts an array of {url, ttl, code}
export async function shortenURL(payload) {
  const now = Date.now();
  const existing = read();

  const stamped = payload.map(({ url, ttl, code }) => {
  const shortcode = code || nanoid(6);
  return {
    shortcode,
    destination: url,
    // 👇 insert these two lines
    createdAt: now,
    expiry: ttl ? now + ttl * 60 * 1000 : null,
    clicks: 0,
  };
});


  write([...existing, ...stamped]);
  return Promise.resolve(stamped);
}

// Mimic GET /stats – returns every record (array)
export async function fetchStats() {
  return Promise.resolve(read());
}