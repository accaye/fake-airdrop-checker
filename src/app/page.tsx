// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";

const FarcasterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.524 16.357c-.286.571-.929.929-1.714.929H8.286c-.785 0-1.429-.357-1.714-.929L3.429 9.714c-.286-.571.071-1.214.643-1.5.571-.286 1.214.071 1.5.643l2.571 5.143 5.714-11.429c.286-.571.929-.929 1.5-.929.571 0 1.214.357 1.5.929l3.143 6.286c.286.571-.071 1.214-.643 1.5-.571.286-1.214-.071-1.5-.643L17.214 8.571l-2.571 5.143c-.286.571-.929.929-1.714.929-.785 0-1.429-.357-1.714-.929L9.5 10.286l-2.571 5.143c-.286.571-.929.929-1.714.929-.785 0-1.429-.357-1.714-.929L1.786 12.001l2.571-5.143c.286-.571.929-.929 1.5-.929.571 0 1.214.357 1.5.929l2.571 5.143 5.714-11.429c.286-.571.929-.929 1.5-.929.571 0 1.214.357 1.5.929l3.143 6.286c.286.571-.071 1.214-.643 1.5-.571.286-1.214-.071-1.5-.643L17.214 8.571l-2.571 5.143c-.286.571-.929.929-1.714.929z"/>
  </svg>
);

export default function FakeAirdropChecker() {
  const [user, setUser] = useState<{ fid: number; username: string } | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isEligible, setIsEligible] = useState(false);
  const [finalResult, setFinalResult] = useState<string | null>(null);

  useEffect(() => {
    const checkFarcasterUser = async () => {
      if (typeof window !== "undefined" && (window as any).farcaster) {
        try {
          const userData = await (window as any).farcaster.getUser();
          setUser({
            fid: userData.fid,
            username: userData.username || "friend",
          });
        } catch (err) {
          console.warn("Not in Farcaster environment");
        }
      } else {
        setUser({ fid: 12345, username: "localuser" });
      }
    };

    checkFarcasterUser();
  }, []);

  const checkEligibility = () => {
    setLoading(true);
    setResult(null);
    setFinalResult(null);
    setIsEligible(false);
    setTimeout(() => {
      const outcomes = [
        `🎉 Congrats, @${user?.username || "friend"}! You're eligible for 1337 $FAKE!`,
        `💎 You’re a true OG! Claim your 9999 $FAKE soon!`,
        `❌ Sorry @${user?.username}, you missed the drop... maybe pray harder?`,
        `🤫 Psst... you're on the secret whitelist. Don't tell anyone!`,
        `⏳ Still processing... just kidding! You got nothing 😅`,
      ];
      const randomResult = outcomes[Math.floor(Math.random() * outcomes.length)];
      const eligible = randomResult.includes("Congrats") || randomResult.includes("OG!");
      setResult(randomResult);
      setIsEligible(eligible);
      setLoading(false);
    }, 2000);
  };

  const handleDoubleOrNothing = () => {
    setLoading(true);
    setTimeout(() => {
      const success = Math.random() > 0.5;
      if (success) {
        let doubled = result!.replace(/(\d+)/, (_, num) => (parseInt(num) * 2).toString());
        doubled = doubled.replace("eligible", "DOUBLE eligible!");
        setFinalResult(doubled);
      } else {
        setFinalResult(`😱 Oh no! You took a risk and lost everything, @${user?.username}!`);
      }
      setLoading(false);
    }, 1500);
  };

  const handleTakeIt = () => {
    setFinalResult(result);
  };

  const shareToFarcaster = () => {
  const textToShare = finalResult || result || "I checked my $FAKE eligibility!";
  const url = "https://airdrop-checker-chi.vercel.app";
  
  const farcasterText = encodeURIComponent(
    `I just checked my eligibility for $FAKE:\n\n"${textToShare}"\n\nTry your luck → ${url}`
  );

  const farcasterUrl = `https://warpcast.com/~/compose?text=${farcasterText}`;
  
  window.open(farcasterUrl, "_blank");
};

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "1.5rem",
        backgroundColor: "#0f0f0f",
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
        textAlign: "center",
        gap: "1.5rem",
      }}
    >
      <div>
        <h1 style={{ fontSize: "2rem", fontWeight: "800", margin: 0 }}>
          Am I Eligible?
        </h1>
        <p style={{ color: "#aaa", marginTop: "0.5rem" }}>
          Fake airdrop checker for $FAKE token
        </p>
      </div>

      {user ? (
        <p style={{ fontSize: "0.9rem", color: "#666" }}>
          Connected as <strong>@{user.username}</strong>
        </p>
      ) : (
        <p style={{ fontSize: "0.9rem", color: "#666" }}>
          Loading...
        </p>
      )}

      {!result && !finalResult ? (
        <button
          onClick={checkEligibility}
          disabled={loading}
          style={{
            padding: "0.75rem 2rem",
            fontSize: "1.1rem",
            fontWeight: "600",
            backgroundColor: loading ? "#333" : "#6366f1",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.2s",
          }}
        >
          {loading ? "Checking..." : "Check Eligibility"}
        </button>
      ) : finalResult ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div
            style={{
              background: "#1a1a1a",
              padding: "1.25rem",
              borderRadius: "16px",
              maxWidth: "300px",
              wordBreak: "break-word",
            }}
          >
            {finalResult}
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
            <button
              onClick={() => {
                setResult(null);
                setFinalResult(null);
                setIsEligible(false);
              }}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "0.95rem",
                backgroundColor: "#333",
                color: "#fff",
                border: "1px solid #444",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
            <button
              onClick={shareToFarcaster}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "0.95rem",
                backgroundColor: "#8b5cf6",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <FarcasterIcon />
              {copied ? "Copied!" : "Share to Farcaster"}
            </button>
          </div>
        </div>
      ) : result && !finalResult ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div
            style={{
              background: "#1a1a1a",
              padding: "1.25rem",
              borderRadius: "16px",
              maxWidth: "300px",
              wordBreak: "break-word",
            }}
          >
            {result}
          </div>
          {isEligible ? (
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <button
                onClick={handleTakeIt}
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "0.95rem",
                  backgroundColor: "#10b981",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Take It!
              </button>
              <button
                onClick={handleDoubleOrNothing}
                disabled={loading}
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "0.95rem",
                  backgroundColor: loading ? "#333" : "#ef4444",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Risky..." : "Double or Nothing!"}
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
              <button
                onClick={() => {
                  setResult(null);
                  setIsEligible(false);
                }}
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "0.95rem",
                  backgroundColor: "#333",
                  color: "#fff",
                  border: "1px solid #444",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Try Again
              </button>
              <button
                onClick={shareToFarcaster}
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "0.95rem",
                  backgroundColor: "#8b5cf6",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <FarcasterIcon />
                {copied ? "Copied!" : "Share to Farcaster"}
              </button>
            </div>
          )}
        </div>
      ) : null}

      <footer style={{ position: "absolute", bottom: "1rem", color: "#444", fontSize: "0.8rem" }}>
        Just for fun • No real tokens
      </footer>
    </div>
  );
}