import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await register(username, password);
      setMessage("Account created! Redirecting to login...");
      setIsError(false);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      if (error.response?.data) {
        if (typeof error.response.data === "object") {
          const msg = Object.values(error.response.data).join(", ");
          setMessage(msg || "Validation error.");
        } else {
          setMessage(error.response.data);
        }
      } else {
        setMessage("An error occurred. Try another username.");
      }
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card sx={{ width: 400, borderRadius: 3, boxShadow: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 'bold', textAlign: 'center', mb: 3 }}
          >
            Create Account
          </Typography>

          {message && (
            <Alert severity={isError ? "error" : "success"} sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
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
              placeholder="Choose a username"
              sx={{ mb: 2 }}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                py: 1.5,
                fontSize: 16,
                backgroundColor: "#0F6E56",
                "&:hover": { backgroundColor: "#0b5240" },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Register"
              )}
            </Button>
          </form>

          <Typography
            sx={{ textAlign: 'center', mt: 2, fontSize: 14, color: 'text.secondary' }}
          >
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#1E4D8C", fontWeight: 500 }}>
              Login
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
