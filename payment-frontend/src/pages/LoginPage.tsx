import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

// Material UI imports — each component from its own path
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoginPage() {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(username, password);
    } catch (err) {
      setError("Wrong username or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Box centers the card on the page
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Card is the white box container */}
      <Card sx={{ width: 400, borderRadius: 3, boxShadow: 3 }}>
        <CardContent sx={{ p: 4 }}>
          {/* Title */}
          <Typography
            variant="h5"
            sx={{ fontWeight: 'bold', textAlign: 'center', mb: 3 }}
          >
            Login
          </Typography>

          {/* Error alert — only shows when error is not empty */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {/* Username field */}
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              required
              value={username}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z]*$/.test(value)) {
                  setUsername(value);
                }
              }}
              placeholder="Enter your username"
              sx={{ mb: 2 }}
            />

            {/* Password field */}
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              sx={{ mb: 3 }}
            />

            {/* Submit button — shows spinner when loading */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                py: 1.5,
                fontSize: 16,
                backgroundColor: "#1E4D8C",
                "&:hover": { backgroundColor: "#163a6b" },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </form>

          {/* Register link */}
          <Typography
            sx={{ textAlign: 'center', mt: 2, fontSize: 14, color: 'text.secondary' }}
          >
            No account?{" "}
            <Link to="/register" style={{ color: "#1E4D8C", fontWeight: 500 }}>
              Register here
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
