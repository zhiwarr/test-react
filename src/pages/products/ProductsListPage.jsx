import { Link } from "react-router-dom";
import { useProductsQuery } from "../../lib/queryHooks";

function ProductsListPage({ token }) {
  const {
    data: products = [],
    isLoading,
    isFetching,
    isError,
    error,
  } = useProductsQuery(token);

  return (
    <div className="rounded-2xl border border-(--border-color) bg-(--bg-color) p-5 text-left shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-(--text-color)">
            Products
          </h1>
        </div>

        <Link
          to="/dashboard/products/create"
          className="rounded-lg bg-(--primary-color) px-4 py-2 text-sm font-semibold text-white transition hover:bg-(--primary-color-hover)"
        >
          Create Product
        </Link>
      </div>

      {isLoading ? (
        <p className="text-sm text-(--text-color)/70">Loading products...</p>
      ) : null}

      {!isLoading && isFetching ? (
        <p className="mb-3 text-xs text-(--text-color)/60">
          Refreshing products...
        </p>
      ) : null}

      {isError ? (
        <p className="rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error instanceof Error ? error.message : "Unable to load products."}
        </p>
      ) : null}

      {!isLoading && !isError ? (
        products.length === 0 ? (
          <p className="text-sm text-(--text-color)/70">
            No products found. Create your first product.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-(--border-color)">
            <table className="min-w-full border-collapse text-sm">
              <thead className="bg-(--primary-color-light)">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-(--text-color)">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-(--text-color)">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-(--text-color)">
                    Category
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-(--text-color)">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-(--text-color)">
                    Price USD
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-(--text-color)">
                    Total USD
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-(--text-color)">
                    Price IQD
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-(--text-color)">
                    Total IQD
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-t border-(--border-color) bg-white/70"
                  >
                    <td className="px-4 py-3 text-(--text-color)/75">
                      #{product.id}
                    </td>
                    <td className="px-4 py-3 font-medium text-(--text-color)">
                      {product.name}
                    </td>
                    <td className="px-4 py-3 text-(--text-color)/75">
                      {product.category}
                    </td>
                    <td className="px-4 py-3 text-right text-(--text-color)/75">
                      {product.quantity}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-(--primary-color)">
                      ${Number(product.price).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-(--text-color)">
                      ${Number(product.totalPriceInUsd).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-(--primary-color)">
                      {Number(product.priceInIqd).toLocaleString()} IQD
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-(--text-color)">
                      {Number(product.totalPriceInIqd).toLocaleString()} IQD
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : null}
    </div>
  );
}

export default ProductsListPage;
