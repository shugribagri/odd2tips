type FormData = {
  title: string;
  excerpt: string;
  content: string;
  authorName: string;
  markdown: string;
  fileUrls: string[];
};

type XData = {
  markdown: string;
  fileUrls: string[];
};

export async function markdownToHtml(markdown: string) {
  const response = await fetch("/api/markdown/convert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ markdown }),
  });
  const { html } = await response.json();
  return html;
}

export async function uploadBlog(formData: FormData) {
  const response = await fetch("/api/blog/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  return data;
}

export async function uploadX(formData: XData) {
  const response = await fetch("/api/twitter/xdata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  return data;
}
