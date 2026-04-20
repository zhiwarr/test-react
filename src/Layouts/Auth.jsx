import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Products", to: "/dashboard/products" },
  { label: "Create Product", to: "/dashboard/products/create" },
];

function Auth({ children, onLogout, userEmail }) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-(--border-color) bg-(--bg-color)/95 backdrop-blur-sm">
        <div className="mx-auto flex w-full items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold text-(--text-color)">
            Dashboard
          </h2>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-(--text-color)/75 sm:inline">
              {userEmail || "Admin"}
            </span>
            <button
              type="button"
              className="rounded-lg bg-(--primary-color) px-4 py-2 text-sm font-semibold text-white transition hover:bg-(--primary-color-hover)"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <aside className="w-full max-w-xs rounded-2xl border border-(--border-color) bg-(--bg-color) p-4">
          <p className="font-semibold uppercase text-(--text-color)/60">
            Management
          </p>
          <nav className="space-y-4 mt-5">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/dashboard/products"}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-(--primary-color) text-white"
                      : "text-(--text-color) hover:bg-(--primary-color-light)"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <section className="min-w-0 flex-1">{children}</section>
      </main>
    </>
  );
}

export default Auth;
