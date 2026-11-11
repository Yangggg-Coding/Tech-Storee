import { sortOptions } from "../../utils/sortProducts";

export default function SortSelect({ value, onChange }) {
  return (
    <div className="sort">
      <label htmlFor="sort" className="sort__label">
        Sort by
      </label>
      <select
        id="sort"
        className="sort__select"
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