import PropTypes from "prop-types";
import Code from "./Code";
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
      }, 1250);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <div className="my-2 mb-4 rounded-md p-2 drop-shadow-md">
      <header>
        <h2 className="my-4 inline-block text-3xl font-bold dark:text-zinc-100">
          {bite?.title}
        </h2>
        <span className="mx-4 inline text-sm text-zinc-400">
          {bite?.language}
        </span>
      </header>
      <div className="relative mb-4 w-full">
        <button
          onClick={() => copySnippet(bite?.code)}
          className="absolute right-3 top-3"
        >
          {copied ? (
            <svg
              className="h-6 w-6 fill-white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M21.582 5.543a1 1 0 0 1 0 1.414l-11.33 11.33a1 1 0 0 1-1.407.006l-6.546-6.429a1 1 0 1 1 1.402-1.427l5.838 5.735 10.629-10.63a1 1 0 0 1 1.414 0Z"
              />
            </svg>
          ) : (
            <svg
              className="h-8 w-8 fill-white"
              viewBox="-2.4 -2.4 28.8 28.8"
              xmlns="http://www.w3.org/2000/svg"
              transform="scale(-1 1)"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.5 16.5v-12l-.75-.75H9l-.75.75v3h-3l-.75.75v12l.75.75H15l.75-.75v-3h3l.75-.75Zm-3.75-.75v-7.5L15 7.5H9.75V5.25H18v10.5h-2.25ZM6 9h8.25v10.5H6V9Z"
              />
            </svg>
          )}
        </button>
        <Code language={bite.language} code={bite?.code} />
      </div>
      {bite.description && (
        <p className="my-6 tracking-tight text-zinc-800 dark:text-zinc-200 max-sm:truncate">
          {bite.description}
        </p>
      )}
      <footer className="my-4 flex items-center justify-between text-sm text-zinc-400">
        <div>{new Date(bite.createdAt).toLocaleString()}</div>
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
