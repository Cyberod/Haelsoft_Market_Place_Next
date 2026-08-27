/**
 * Emits a JSON-LD block. Server component, so the markup is in the initial
 * HTML where crawlers read it.
 *
 * JSON.stringify output is escaped for `<` to avoid closing the script tag
 * early if any field ever contains markup.
 */
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
