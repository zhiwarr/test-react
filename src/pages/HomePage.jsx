function HomePage() {
  return (
    <div className="rounded-2xl border border-(--border-color) bg-(--bg-color) p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-center gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-(--text-color) text-center">
            Home Page
          </h1>
          <p className="mt-1 text-sm text-(--text-color)/75">
            Welcome to the Home Page.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
