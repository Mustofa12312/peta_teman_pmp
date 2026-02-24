export async function uploadToCloudinary(file) {
  const CLOUD_NAME = "dutwhtoow";
  const UPLOAD_PRESET = "peta_teman_upload";

  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", UPLOAD_PRESET);
  form.append("folder", "friends");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
    { method: "POST", body: form }
  );

  const data = await res.json();

  if (!data.secure_url) {
    throw new Error("Upload Cloudinary gagal");
  }

  return data.secure_url; // 🔥 URL HTTPS PUBLIK
}
