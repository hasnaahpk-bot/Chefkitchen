import { useState } from "react";
import { useNavigate } from "react-router-dom";

const USERS = [
  { email: "admin@gmail.com", password: "1234", role: "admin" },
  { email: "user@gmail.com", password: "1234", role: "user" },
];

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const found = USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      setError("Invalid credentials");
      return;
    }

    // ✅ Role based navigation
    if (found.role === "admin") {
      navigate("/dashboard");
    }

    if (found.role === "user") {
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-80 space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Login</h2>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
        >
          Login
        </button>

        <div className="text-xs text-gray-500 text-center">
          <p>Admin: admin@gmail.com / 1234</p>
          <p>User: user@gmail.com / 1234</p>
        </div>
      </form>

    </div>
  );
}
