import { useState } from "react";

function ScreenshotUploader({ userData, onAnswer }) {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // GET PRESIGNED URL
  async function getPresignedUrl(filename) {
    const res = await fetch(
      "https://2qlxsj0coh.execute-api.us-east-1.amazonaws.com/dev/upload?filename=" + filename
    );
    return res.json(); // { uploadUrl, bucket, key }
  }

  // UPLOAD FILE
  async function uploadFile(file) {
    const { uploadUrl, bucket, key } = await getPresignedUrl(file.name);

    await fetch(uploadUrl, {
      method: "PUT",
      body: file,
    });

    return { bucket, key };
  }

  // PROCESS FILE
  async function processFile(bucket, key) {
    const res = await fetch(
      "https://2qlxsj0coh.execute-api.us-east-1.amazonaws.com/dev/process",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bucket,
          key,
          ...userData,
          query: "Analyze my screenshot",
        }),
      }
    );

    return res.json(); // { answer }
  }

  // MAIN HANDLER
  async function handleUpload() {
    if (!file) return;

    setLoading(true);

    try {
      const { bucket, key } = await uploadFile(file);
      const result = await processFile(bucket, key);
      onAnswer(result.answer);
    } catch {
      onAnswer("⚠️ Failed to process screenshot.");
    }

    setLoading(false);
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-4">

      <h3 className="font-semibold mb-2">
        Upload Bank Statement / Screenshot
      </h3>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-3 text-sm"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg text-sm"
      >
        {loading ? "Processing..." : "Upload & Analyze"}
      </button>

    </div>
  );
}

export default ScreenshotUploader;
