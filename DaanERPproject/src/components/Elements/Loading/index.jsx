import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingItem = () => {
  return (
    <Box sx={{ display: "flex", margin: "30px auto", placeContent: "center" }}>
      <CircularProgress size="4rem" aria-label="Loading…" />
    </Box>
  );
};

export default LoadingItem;
