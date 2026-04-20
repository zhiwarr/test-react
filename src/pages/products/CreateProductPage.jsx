import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../../components/FormField";
import FormSelect from "../../components/FormSelect";
import {
  useCategoriesQuery,
  useCreateProductMutation,
} from "../../lib/queryHooks";

const fields = [
  {
    key: "name",
    label: "Name",
    type: "text",
    placeholder: "Product 1",
  },
  {
    key: "priceInIqd",
    label: "Price (IQD)",
    type: "number",
    min: "0",
    step: "250",
    placeholder: "1500000",
  },
  {
    key: "priceInUsd",
    label: "Price (USD)",
    type: "number",
    min: "0",
    step: "0.01",
    placeholder: "1200.50",
  },
  {
    key: "quantity",
    label: "Quantity",
    type: "number",
    min: "1",
    step: "1",
    placeholder: "100",
  },
];

function CreateProductPage({ token }) {
  const [formValues, setFormValues] = useState({
    name: "",
    priceInIqd: "",
    priceInUsd: "",
    quantity: "",
  });
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const createMutation = useCreateProductMutation(token);
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError: isCategoriesError,
    error: categoriesError,
  } = useCategoriesQuery(token);

  const handleFieldChange = (key) => (event) => {
    setFormValues((previous) => ({
      ...previous,
      [key]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const hasMissingRequiredField = fields.some(
      (field) => !formValues[field.key],
    );
    if (hasMissingRequiredField || !categoryId) {
      setError("All fields are required.");
      return;
    }

    const priceInIqd = Number(formValues.priceInIqd);
    const priceInUsd = Number(formValues.priceInUsd);
    const quantity = Number(formValues.quantity);

    if (!Number.isFinite(priceInIqd) || !Number.isFinite(priceInUsd)) {
      setError("Prices must be valid numbers.");
      return;
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      setError("Quantity must be a valid integer greater than 0.");
      return;
    }

    setError("");
    createMutation.mutate(
      {
        ...formValues,
        priceInIqd,
        priceInUsd,
        quantity,
        categoryId,
      },
      {
        onSuccess: () => {
          navigate("/dashboard/products");
        },
        onError: (mutationError) => {
          setError(
            mutationError instanceof Error
              ? mutationError.message
              : "Unable to create product. Please try again.",
          );
        },
      },
    );
  };

  return (
    <div className="rounded-2xl border border-(--border-color) bg-(--bg-color) p-5 text-left shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-(--text-color)">
          Create Product
        </h1>
        <Link
          to="/dashboard/products"
          className="rounded-lg border border-(--border-color) px-4 py-2 text-sm font-medium text-(--text-color) transition hover:bg-(--primary-color-light)"
        >
          Back to Products
        </Link>
      </div>

      {error ? (
        <p className="mb-4 rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {fields.map((field) => (
          <FormField
            key={field.key}
            label={field.label}
            type={field.type}
            min={field.min}
            step={field.step}
            value={formValues[field.key]}
            onChange={handleFieldChange(field.key)}
            placeholder={field.placeholder}
            disabled={createMutation.isPending}
            required
          />
        ))}

        <FormSelect
          label="Category"
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={createMutation.isPending || isLoadingCategories}
          required
        >
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </FormSelect>

        {isLoadingCategories ? (
          <p className="-mt-2 text-xs text-(--text-color)/60">
            Loading categories...
          </p>
        ) : null}
        {isCategoriesError ? (
          <p className="-mt-2 text-xs text-red-300">
            {categoriesError instanceof Error
              ? categoriesError.message
              : "Unable to load categories."}
          </p>
        ) : null}

        <button
          type="submit"
          className="w-full rounded-lg bg-(--primary-color) px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-(--primary-color-hover) disabled:cursor-not-allowed disabled:opacity-70"
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}

export default CreateProductPage;
