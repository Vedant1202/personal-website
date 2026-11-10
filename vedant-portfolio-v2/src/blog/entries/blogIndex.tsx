// src/blog/entries/blogIndex.tsx — entry for blogs/index.html
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../index.css";
import "../../styles/Blog.css";
import { BlogIndexPage } from "../BlogIndexPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BlogIndexPage />
  </StrictMode>,
);
