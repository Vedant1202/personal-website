// src/content/blog/claude-code-terminal-setup.ts
import body from "./claude-code-terminal-setup.md?raw";
import prismantisReply from "../../assets/blog/claude-code-terminal-setup/prismantis-reply.webp";
import statusline from "../../assets/blog/claude-code-terminal-setup/statusline.webp";
import toast from "../../assets/blog/claude-code-terminal-setup/toast.webp";
import type { PostContent } from "../../blog/BlogPostPage";

/** Image keys match the `![alt](key)` references in the Markdown */
export const content: PostContent = {
  body,
  images: {
    "prismantis-reply": { src: prismantisReply, width: 1600, height: 440 },
    statusline: { src: statusline, width: 1580, height: 66 },
    toast: { src: toast, width: 720, height: 145 },
  },
};
