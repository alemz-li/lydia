import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Code from "./Code";

const Bite = ({ bite }) => {
  return (
    <div className="m-4 rounded-md p-2 drop-shadow-md">
      <header>
        <h2 className="my-2 text-3xl font-bold">
          <Link to={`/bites/update/${bite._id}`}>{bite?.title}</Link>
        </h2>
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
