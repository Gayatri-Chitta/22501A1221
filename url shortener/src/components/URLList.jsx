import { Card, CardContent, Typography, Link, Stack } from "@mui/material";

export default function URLList({ data = [] }) {
  if (!data.length) return null;
  return (
    <Stack spacing={2} sx={{ mt: 4 }}>
      {data.map(({ shortcode, destination, expiry, createdAt }) => (
        <Card key={shortcode}>
          <CardContent>
            <Typography variant="body2" gutterBottom>
              <strong>Original:</strong> {destination}
            </Typography>
            <Typography variant="body1">
              <Link href={`/${shortcode}`} target="_blank" rel="noopener">
                {window.location.origin}/{shortcode}
              </Link>
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Expires: {expiry ? new Date(expiry).toLocaleString() : "Never"}
              {" | Created: "}
              {new Date(createdAt).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}