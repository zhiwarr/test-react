function FormField({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-(--text-color)">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-lg border border-(--border-color) bg-white px-3 py-2 text-sm text-(--text-color) outline-none ring-(--primary-color)/40 transition focus:ring-2"
      />
    </label>
  );
}

export default FormField;
