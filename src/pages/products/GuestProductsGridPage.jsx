import { useGuestProductsQuery } from "../../lib/queryHooks";

function GuestProductsGridPage() {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useGuestProductsQuery();

  return (
    <section className="space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl items-end justify-between gap-4">
        <div className="text-left">
          <h1 className="text-3xl font-semibold text-(--text-color)">
            Products
          </h1>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl">
        {isLoading ? (
          <p className="text-left text-sm text-(--text-color)/70">
            Loading products...
          </p>
        ) : null}

        {isError ? (
          <p className="rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-left text-sm text-red-300">
            {error instanceof Error
              ? error.message
              : "Unable to load products."}
          </p>
        ) : null}

        {!isLoading && !isError ? (
          products.length === 0 ? (
            <p className="text-left text-sm text-(--text-color)/70">
              No products available for guests right now.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="rounded-2xl border border-(--border-color) bg-(--bg-color) p-4 text-left shadow-sm"
                >
                  <p className="text-xs font-medium text-(--text-color)/60">
                    #{product.id}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-(--text-color)">
                    {product.name}
                  </h2>
                  <p className="mt-1 text-sm text-(--text-color)/70">
                    {product.category}
                  </p>

                  <div className="mt-4 grid grid-cols-3 gap-3 text-sm wrap-break-word">
                    <div>
                      <p className="text-(--text-color)/60">Qty</p>
                      <p className="font-medium text-(--text-color)">
                        {product.quantity}
                      </p>
                    </div>
                    <div>
                      <p className="text-(--text-color)/60">Price (USD)</p>
                      <p className="font-semibold text-(--primary-color)">
                        ${Number(product.price).toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-(--text-color)/60">Price (IQD)</p>
                      <p className="font-semibold text-(--primary-color)">
                        {Number(product.priceInIqd).toLocaleString()} IQD
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )
        ) : null}
      </div>
    </section>
  );
}

export default GuestProductsGridPage;
