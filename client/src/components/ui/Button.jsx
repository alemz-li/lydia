export function Button({ onClick, children }) {
  return (
    <button
      className={`my-2 rounded-md bg-neutral-800 px-4 py-1 text-white hover:bg-neutral-700`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
