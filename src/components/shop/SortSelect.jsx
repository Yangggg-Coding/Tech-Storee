import { sortOptions } from "../../utils/sortProducts";

export default function SortSelect({ value, onChange }) {
  return (
    <div className="sort">
      <label htmlFor="sort" className="sort_label">
        Sort by
      </label>
      <select
        id="sort"
        className="sort_select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {sortOptions.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
