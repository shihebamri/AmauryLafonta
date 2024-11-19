// components/AuthPage.tsx
"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming ShadCN uses Button and Input components
import { Input } from "@/components/ui/input"; 
const encodedPassword = "K2FtYXVyeUxBRk9OVEEjIyM=";

const AuthPage = ({ onAuthSuccess }: { onAuthSuccess: () => void }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (btoa(password) === encodedPassword) {
      sessionStorage.setItem("authenticated", "true");
      onAuthSuccess();
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl mb-4">Admin Login</h1>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <Button onClick={handleLogin} className="mt-4">
        Login
      </Button>
    </div>
  );
};

export default AuthPage;
