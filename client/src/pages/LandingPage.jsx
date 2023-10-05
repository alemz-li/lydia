const LandingPage = () => {
  return (
    <div>
      <section className="my-4">
        <div className="text-2xl font-bold tracking-tight dark:text-zinc-100">
          <div>Welcome to Lydia!</div>
          <div>Your Code Snippets Made Simple</div>
        </div>
      </section>
      <section className="text-md mb-4 font-semibold text-zinc-700 dark:text-zinc-300">
        Lydia is your go-to platform for effortlessly storing and sharing your
        code snippets, or as we like to call them, &quot;Bites.&quot; Whether
        you&apos;re a seasoned developer, a coding enthusiast, or just looking
        for a convenient way to manage your code snippets, Lydia has you
        covered. Keep all your bites in one place and share across your friends!
      </section>
      <section>
        <ul className="dark:text-zinc-100">
          <li className="mb-2">
            <div>
              <span className="font-bold">Code Editor</span>
              <p className="dark:text-zinc-400">
                Lydia has a built in code editor for you to start coding your
                bites.
              </p>
            </div>
          </li>
          <li className="mb-2">
            <div>
              <span className="font-bold">Instant Sharing</span>
              <p className="dark:text-zinc-400">
                Share your Bites with colleagues, friends, or the entire coding
                community.
              </p>
            </div>
          </li>
          <li className="mb-2">
            <div>
              <span className="font-bold">Syntax Highlighting</span>
              <p className="dark:text-zinc-400">
                Lydia supports syntax highlighting for a wide range of
                programming languages. Your code will always look its best,
                making it easier to read and understand.
              </p>
            </div>
          </li>
          <li className="mb-2">
            <div>
              <span className="font-bold">Privacy Controls</span>
              <p className="dark:text-zinc-400">
                You have full control over who can access your Bites. Keep them
                private for personal use or share them with specific individuals
                or the public, it&apos;s all up to you.
              </p>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default LandingPage;
