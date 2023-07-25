import Prism from "prismjs";
import PropTypes from "prop-types";
// import "prismjs/themes/prism.css";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import { useEffect } from "react";

const Code = ({ language, code }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <pre className="rounded-lg">
      <code className={`language-${language.toLowerCase()}`}>{code}</code>
    </pre>
  );
};

Code.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default Code;
