function Footer() {
  return (
    <footer className="mt-8 bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-10 text-zinc-900 dark:text-white">
        <h2 className="text-2xl font-bold dark:text-white">Shopix</h2>

        <div className="mt-4 flex flex-wrap gap-6 text-sm text-zinc-600 dark:text-zinc-300">
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>

        <p className="mt-6 text-sm text-zinc-500">
          © 2026 Shopix. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
