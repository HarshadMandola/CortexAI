import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const markdownImagePattern = /!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/g;
const plainImageUrlPattern = /(^|\n)(https?:\/\/[^\s]+?\.(?:png|jpe?g|gif|webp|avif)(?:\?[^\s]*)?)(?=\s|$)/gi;

function separateImages(content, responseImages = []) {
  const images = Array.isArray(responseImages) ? [...responseImages] : [];
  let text = String(content ?? "");

  text = text.replace(markdownImagePattern, (_, alt, url) => {
    images.push({ url, alt });
    return "";
  });

  text = text.replace(plainImageUrlPattern, (_, prefix, url) => {
    images.push({ url, alt: "Generated image" });
    return prefix;
  });

  const uniqueImages = images
    .map((image) => (typeof image === "string" ? { url: image } : image))
    .filter((image) => image?.url)
    .filter((image, index, allImages) => allImages.findIndex((item) => item.url === image.url) === index);

  return { images: uniqueImages, text: text.trim() };
}

function MessageBubble({ role, content, images: responseImages }) {
  const isUser = role === "user";
  const { images, text } = separateImages(content, responseImages);

  return (
    <div className={`mb-7 flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex max-w-[90%] items-start gap-3 sm:max-w-[82%] ${isUser ? "flex-row-reverse" : ""}`}>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${isUser ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"}`}>
          {isUser ? <User size={18} /> : <Bot size={18} />}
        </div>

        <div className="min-w-0 space-y-3">
          {images.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {images.map((image) => (
                <a key={image.url} href={image.url} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-2xl border border-gray-700 bg-[#2b2b2b]">
                  <img src={image.url} alt={image.alt || "AI response image"} className="max-h-[420px] w-full object-cover transition duration-200 hover:scale-[1.02]" loading="lazy" />
                </a>
              ))}
            </div>
          )}

          {text && (
            <div className={`break-words rounded-2xl px-5 py-3 shadow-sm ${isUser ? "rounded-br-md bg-blue-600 text-white" : "rounded-bl-md border border-gray-700 bg-[#2b2b2b] text-gray-100"}`}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => <h1 className="mb-3 text-2xl font-bold">{children}</h1>,
                  h2: ({ children }) => <h2 className="mb-3 text-xl font-bold">{children}</h2>,
                  h3: ({ children }) => <h3 className="mb-2 text-lg font-semibold">{children}</h3>,
                  p: ({ children }) => <p className="mb-3 whitespace-pre-wrap text-[15px] leading-7 last:mb-0">{children}</p>,
                  ul: ({ children }) => <ul className="mb-3 list-disc space-y-1 pl-5 last:mb-0">{children}</ul>,
                  ol: ({ children }) => <ol className="mb-3 list-decimal space-y-1 pl-5 last:mb-0">{children}</ol>,
                  a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer" className="text-blue-300 underline underline-offset-2 hover:text-blue-200">{children}</a>,
                  blockquote: ({ children }) => <blockquote className="mb-3 border-l-2 border-gray-500 pl-3 text-gray-300">{children}</blockquote>,
                  pre: ({ children }) => <pre className="mb-3 overflow-x-auto rounded-lg bg-black/30 p-3 text-sm">{children}</pre>,
                  code: ({ children }) => <code className="rounded bg-black/25 px-1.5 py-0.5 font-mono text-[0.9em]">{children}</code>,
                  table: ({ children }) => <div className="mb-3 overflow-x-auto"><table className="w-full border-collapse text-left text-sm">{children}</table></div>,
                  th: ({ children }) => <th className="border border-gray-600 bg-black/20 px-3 py-2 font-semibold">{children}</th>,
                  td: ({ children }) => <td className="border border-gray-700 px-3 py-2 align-top">{children}</td>,
                }}
              >
                {text}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;
