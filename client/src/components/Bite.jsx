const Bite = ({ bite }) => {
  return (
    <div className="m-4 rounded-md p-2 drop-shadow-md">
      <header>
        <h2 className="my-2 text-2xl font-bold">{bite?.title}</h2>
        <span className="text-zinc-400">{bite?.language}</span>
      </header>
      {bite.description && <p>{bite.description}</p>}
      <div>
        <pre>{bite?.code}</pre>
      </div>
    </div>
  );
};

export default Bite;
