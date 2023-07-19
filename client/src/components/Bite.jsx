import { Link } from "react-router-dom";

const Bite = ({ bite }) => {
  return (
    <div className="m-4 rounded-md p-2 drop-shadow-md">
      <header>
        <h2 className="my-2 text-2xl font-bold">
          <Link to={`/bites/update/${bite._id}`}>{bite?.title}</Link>
        </h2>
        <span className="text-zinc-400">{bite?.language}</span>
      </header>
      {bite.description && <p>{bite.description}</p>}
      <div>
        <pre>{bite?.code}</pre>
      </div>
      <footer className="my-2 flex items-center justify-between text-sm text-zinc-400">
        <div>{new Date(bite.createdAt).toUTCString()}</div>
        {bite.isPublic && <div>Public</div>}
      </footer>
    </div>
  );
};

export default Bite;
