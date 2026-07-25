/**
 * Renders a JSON-LD <script>. Content is serialised safely (angle brackets
 * escaped) to avoid breaking out of the script context.
 */
interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
  id?: string;
}

export function JsonLd({ data, id }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      id={id}
      type="application/ld+json"
      // Safe: value is JSON.stringify output with `<` escaped.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
