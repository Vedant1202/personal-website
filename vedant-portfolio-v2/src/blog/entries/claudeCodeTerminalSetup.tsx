// src/blog/entries/claudeCodeTerminalSetup.tsx — entry for blogs/claude-code-terminal-setup/index.html
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../index.css";
import "../../styles/Blog.css";
import { getPost } from "../../data/posts";
import { content } from "../../content/blog/claude-code-terminal-setup";
import { BlogPostPage } from "../BlogPostPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BlogPostPage post={getPost("claude-code-terminal-setup")} content={content} />
  </StrictMode>,
);
