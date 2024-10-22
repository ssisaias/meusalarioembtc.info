import { Link } from "@remix-run/react";

export default function SourceCitation({
  citationText,
  citationUrl,
}: {
  citationText: string;
  citationUrl: string;
}) {
  return (
    <div className="py-1 px-2">
      <Link to={citationUrl} className="hover:underline decoration-yellow-400">
        <pre className="text-wrap">{citationText}</pre>
      </Link>
    </div>
  );
}
