export type BlogContentFormProps = {
  title: string;
  setTitle: (value: string) => void;
  excerpt: string;
  setExcerpt: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
  authorName: string;
  setAuthorName: (value: string) => void;
  handleCoverImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAuthorImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
