import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Code from "./Code";
import { Button } from "./ui/Button";
import { useState, useEffect } from "react";

const Bite = ({ bite }) => {
  const [copied, setCopied] = useState(false);

  const copySnippet = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <div className="m-4 rounded-md p-2 drop-shadow-md">
      <header>
        <div className="flex items-center justify-between">
          <h2 className="my-4 text-3xl font-bold">
            <Link to={`/bites/view/${bite._id}`}>{bite?.title}</Link>
          </h2>
          <Button onClick={() => copySnippet(bite?.code)}>
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
        <span className="text-zinc-400">{bite?.language}</span>
      </header>
      {bite.description && (
        <p className="my-3 text-zinc-800">{bite.description}</p>
      )}
      <div>
        <Code language={bite.language} code={bite?.code} />
      </div>
      <footer className="my-2 flex items-center justify-between text-sm text-zinc-400">
        <div>{new Date(bite.createdAt).toUTCString()}</div>
        {bite.isPublic && <div>Public</div>}
      </footer>
    </div>
  );
};

Bite.propTypes = {
  bite: PropTypes.shape({
    title: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    description: PropTypes.string,
    createdAt: PropTypes.string,
    isPublic: PropTypes.bool,
    _id: PropTypes.string,
  }).isRequired,
};

export default Bite;
