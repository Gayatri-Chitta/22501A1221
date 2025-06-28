import { DataGrid } from "@mui/x-data-grid";

// Stats table now shows Expiry + Created, dropping Clicks & Last‑Click columns
export default function URLStatsTable({ rows }) {
  const cols = [
    { field: "shortcode", headerName: "Shortcode", flex: 1 },
    { field: "destination", headerName: "Original URL", flex: 2 },
    
    
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={cols}
        getRowId={(row) => row.shortcode}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
}