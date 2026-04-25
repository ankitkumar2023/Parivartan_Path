import React, { useState, useEffect } from "react";

export default function ThemeTestPage() {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("theme") === "dark";
    } catch {
      return false;
    }
  });

  const [htmlElement, setHtmlElement] = useState(null);
  const [isDarkClassPresent, setIsDarkClassPresent] = useState(false);
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    console.log(message);
    setLogs((prev) => [...prev, { time: new Date().toLocaleTimeString(), msg: message }]);
  };

  useEffect(() => {
    setHtmlElement(document.documentElement);
    addLog("✅ Component mounted");
    addLog("Current dark state: " + dark);
    addLog("HTML element: " + document.documentElement.className);
  }, []);

  useEffect(() => {
    addLog("🔄 Dark state changed to: " + dark);
    const htmlEl = document.documentElement;
    
    if (dark) {
      htmlEl.classList.add("dark");
      document.body.style.backgroundColor = "#0f172a";
      document.body.style.color = "#f1f5f9";
      addLog("✅ Added 'dark' class to html element");
    } else {
      htmlEl.classList.remove("dark");
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#1e293b";
      addLog("✅ Removed 'dark' class from html element");
    }

    // Save to localStorage
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
      addLog("✅ Saved to localStorage: " + (dark ? "dark" : "light"));
    } catch (e) {
      addLog("❌ Failed to save to localStorage: " + e.message);
    }

    // Check if class is actually present
    const hasDarkClass = document.documentElement.classList.contains("dark");
    setIsDarkClassPresent(hasDarkClass);
    addLog("HTML classes: " + document.documentElement.className);
    addLog("Has 'dark' class: " + hasDarkClass);
  }, [dark]);

  const toggleTheme = () => {
    addLog("🔘 Toggle button clicked!");
    setDark((v) => !v);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "monospace" }}>
      <h1>🎨 Theme Toggle Diagnostic Page</h1>
      
      <div style={{ marginBottom: "30px" }}>
        <button
          onClick={toggleTheme}
          style={{
            padding: "15px 30px",
            fontSize: "18px",
            backgroundColor: dark ? "#334155" : "#ffffff",
            color: dark ? "#f1f5f9" : "#1e293b",
            border: "2px solid #10b981",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          {dark ? "☀️ Switch to Light Mode" : "🌙 Switch to Dark Mode"}
        </button>

        <div style={{ marginTop: "20px" }}>
          <h2>Current State:</h2>
          <p>
            <strong>Dark Mode Active:</strong> {dark ? "✅ YES" : "❌ NO"}
          </p>
          <p>
            <strong>Dark Class on HTML:</strong> {isDarkClassPresent ? "✅ YES" : "❌ NO"}
          </p>
          <p>
            <strong>HTML className:</strong> <code>{document.documentElement.className || "(empty)"}</code>
          </p>
          <p>
            <strong>Body backgroundColor:</strong> <code>{document.body.style.backgroundColor || "(default)"}</code>
          </p>
          <p>
            <strong>localStorage "theme":</strong> <code>{localStorage.getItem("theme") || "(not set)"}</code>
          </p>
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>📋 Event Logs:</h2>
        <div
          style={{
            backgroundColor: dark ? "#1e293b" : "#f8fafc",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            padding: "15px",
            maxHeight: "400px",
            overflowY: "auto",
            fontSize: "12px",
          }}
        >
          {logs.length === 0 ? (
            <p style={{ color: "#64748b" }}>No logs yet...</p>
          ) : (
            logs.map((log, i) => (
              <div key={i} style={{ marginBottom: "8px", color: dark ? "#cbd5e1" : "#475569" }}>
                <span style={{ color: "#94a3b8" }}>[{log.time}]</span> {log.msg}
              </div>
            ))
          )}
        </div>
      </div>

      <div style={{ marginTop: "40px", fontSize: "14px", color: "#64748b" }}>
        <h3>Instructions:</h3>
        <ol>
          <li>Click the theme toggle button above</li>
          <li>Watch the "Current State" section update</li>
          <li>Check that:
            <ul>
              <li>✅ "Dark Mode Active" shows YES/NO correctly</li>
              <li>✅ "Dark Class on HTML" shows YES/NO correctly</li>
              <li>✅ The page background changes color</li>
              <li>✅ "Event Logs" section shows your actions</li>
            </ul>
          </li>
          <li>Reload the page - your theme preference should persist</li>
        </ol>
      </div>
    </div>
  );
}
