import { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
];

function Guest({ children, onSignInClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-(--border-color) bg-(--bg-color)/95 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <NavLink
            to="/"
            className="text-xl font-bold tracking-tight text-(--text-color)"
          >
            Test
          </NavLink>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
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

          <div className="hidden items-center gap-3 sm:flex">
            <button
              type="button"
              className="rounded-lg border border-(--border-color) px-4 py-2 text-sm font-medium text-(--text-color) transition hover:border-(--primary-color) hover:bg-(--primary-color) hover:text-(--code-bg-color)"
              onClick={onSignInClick}
            >
              Sign In
            </button>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-(--text-color) transition hover:bg-(--primary-color) md:hidden"
            aria-label="Toggle navigation menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? "❌" : "☰"}
          </button>
        </div>

        {isMenuOpen && (
          <div className="border-t border-(--border-color) bg-(--bg-color) px-4 py-4 md:hidden sm:px-6">
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
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
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                className="w-full rounded-lg border border-(--border-color) px-4 py-2 text-sm font-medium text-(--text-color) transition hover:bg-(--primary-color)"
                onClick={onSignInClick}
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </header>
      <div>{children}</div>
    </>
  );
}

export default Guest;
