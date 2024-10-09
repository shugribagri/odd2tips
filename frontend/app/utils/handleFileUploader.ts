export async function handleFileUploader(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch("/api/upload/file", {
    method: "POST",
    body: formData,
  });
  const { url } = await response.json();
  return url;
}
