"use client";

import { useState } from "react";
import styles from "./styles.module.css";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    const reader = new FileReader();

    reader.onload = async () => {
      await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({
          fileName: file.name,
          content: reader.result,
        }),
      });

      setLoading(false);
      alert("File uploaded successfully!");
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upload File</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleUpload}
        className={styles.button}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
