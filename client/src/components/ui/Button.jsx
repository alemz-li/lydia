export function Button({ onClick, children }) {
  return (
    <button
      className={`my-2 self-start rounded-md bg-neutral-800 px-4 py-1 text-white shadow hover:bg-neutral-700 sm:self-auto`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
