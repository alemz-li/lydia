import Code from "../components/Code.jsx";

const LandingPage = () => {
  const FeatureCard = ({ title, info }) => {
    return (
      <li className="m-4 rounded-md from-neutral-900 via-black to-neutral-950 p-6 px-6 py-8 dark:bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))]">
        <h2 className="mb-4 text-2xl font-bold leading-tight">{title}</h2>
        <p className="dark:text-zinc-400">{info}</p>
      </li>
    );
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 top-0 -z-10 mx-auto h-screen w-screen">
        <div className="absolute bottom-0 left-0 right-0 top-0 z-[-10] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>
      <div className="container mx-auto px-6">
        <section aria-label="Hero" className="mb-9">
          <div>
            <div className="my-8 font-bold tracking-tight dark:text-zinc-100">
              <h1 className="mb-4 text-6xl md:text-8xl">Welcome to Lydia!</h1>
              <h2 className="mb-2 text-2xl md:text-4xl">
                Your Code Snippets Made Simple
              </h2>
            </div>
          </div>
          <div className="text-md mb-4 gap-12 text-neutral-800 dark:text-neutral-400 md:grid md:grid-cols-2">
            <p className="mb-4">
              Lydia is your go-to platform for effortlessly storing and sharing
              your code snippets, or as we like to call them, &quot;Bites.&quot;
              Whether you&apos;re a seasoned developer, a coding enthusiast, or
              just looking for a convenient way to manage your code snippets.
              Keep all your bites in one place and share across your friends!
            </p>
            <div>
              <Code
                language="Javascript"
                code={`const hello = "Hello World" \nconsole.log(hello)`}
              />
              <p className="font-light text-neutral-700 dark:text-neutral-400">
                Javascript
              </p>
            </div>
          </div>
        </section>
        <section aria-label="Features">
          <h2 className="text-2xl font-extralight text-neutral-800 dark:text-neutral-400">
            FEATURES
          </h2>
          <ul className="mb-8 grid grid-cols-2 dark:text-zinc-100 lg:grid-cols-4">
            <FeatureCard
              title="Code Editor"
              info="Lydia has a built in code editor for you to start coding your
              bites."
            ></FeatureCard>
            <FeatureCard
              title="Instant Sharing"
              info="Share your Bites with colleagues, friends, or the entire coding
              community."
            ></FeatureCard>
            <FeatureCard
              title="Syntax Highlighting"
              info="Lydia supports syntax highlighting for a wide range of programming
              languages. Your code will always look its best, making it easier
              to read and understand."
            ></FeatureCard>
            <FeatureCard
              title="Privacy Controls"
              info="You have full control over who can access your Bites. Keep them
              private for personal use."
            ></FeatureCard>
          </ul>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
