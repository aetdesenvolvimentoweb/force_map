"use client";

import { useState } from "react";

export default function Home() {
  const [ip, setIp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true);

    const response = await fetch("https://api.db-ip.com/v2/free/self").finally(
      () => setLoading(false)
    );
    console.log(response);

    if (response.ok) {
      const res = await response.json();
      setIp(res.ipAddress);
    } else {
      setIp("não encontrou...");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1>Hello Mapa Força</h1>
      <button onClick={handleLogin}>Login</button>
      {loading && <span>Carregando...</span>}
      <span>{ip}</span>
    </main>
  );
}
