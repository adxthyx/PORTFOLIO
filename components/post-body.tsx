import ReactMarkdown from "react-markdown"

/** Portfolio content stays Markdown; raw HTML is never executed. */
export function PostBody({ content }: { content: string }) {
  const body = content.replace(/^# [^\n]+\n+/, "")
  return (
    <div className="post-body">
      <ReactMarkdown
        skipHtml
        components={{
          h1: ({ children }) => <h2>{children}</h2>,
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  )
}
