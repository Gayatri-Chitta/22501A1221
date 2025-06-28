import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  IconButton,
  Tooltip,
  Grid,
  Paper,
} from "@mui/material";
import { nanoid } from "nanoid";
import { isValidUrl, isPositiveInteger } from "../utils/validators";
import { shortenURL } from "../services/api";
import { log } from "../services/logger";

const EMPTY_ITEM = { id: nanoid(), url: "", ttl: 30, code: "" };

export default function URLShortenerForm({ onSuccess }) {
  const [items, setItems] = useState([EMPTY_ITEM]);
  const [error, setError] = useState("");

  const handleChange = (id, field) => (e) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [field]: e.target.value } : it))
    );
  };

  const addItem = () =>
    setItems((prev) => (prev.length < 5 ? [...prev, { ...EMPTY_ITEM, id: nanoid() }] : prev));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // basic validation
    for (const { url, ttl, code } of items) {
      if (!isValidUrl(url)) return setError("Invalid URL found");
      if (ttl && !isPositiveInteger(ttl)) return setError("TTL must be positive integer");
      if (code && !/^[a-z0-9]+$/i.test(code)) return setError("Shortcode must be alphanumeric");
    }

    try {
      const res = await shortenURL(items);
      onSuccess(res); // pass list of shortened items back to page
      log("Short URLs created", res);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Paper sx={{ p: 3 }} component="form" onSubmit={handleSubmit}>
      {items.map(({ id, url, ttl, code }, idx) => (
        <Grid container spacing={2} key={id} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label={`URL #${idx + 1}`}
              value={url}
              onChange={handleChange(id, "url")}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label="Validity (min)"
              value={ttl}
              onChange={handleChange(id, "ttl")}
              type="number"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Custom shortcode"
              value={code}
              onChange={handleChange(id, "code")}
              fullWidth
            />
          </Grid>
        </Grid>
      ))}

      <Box textAlign="right" mb={2}>
        <Button onClick={addItem} disabled={items.length >= 5}>
          Add URL
        </Button>
      </Box>

      {error && <Box color="error.main" mb={2}>{error}</Box>}

      <Button variant="contained" type="submit">
        Shorten
      </Button>
    </Paper>
  );
}