import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

function CustomSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const selectRef = useRef(null);

  const options = [
    { value: "default", label: "Sort Products" },
    { value: "low-high", label: "Price: Low To High" },
    { value: "high-low", label: "Price: High To Low" },
    { value: "a-z", label: "Name: A-Z" },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((item) => item.value === value);

  return (
    <div className="relative w-full sm:w-60" ref={selectRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-2xl border border-violet-200 bg-violet-50 px-5 py-3 text-zinc-900 shadow-sm transition-colors hover:border-violet-400 dark:border-violet-800 dark:bg-[#221D38] dark:text-white"
      >
        <span>{selected.label}</span>

        <ChevronDown
          size={18}
          className={`${open ? "rotate-180" : ""} transition-transform`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-2xl border border-violet-200 bg-white shadow-xl dark:border-violet-800 dark:bg-[#221D38]">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`block w-full px-5 py-3 text-left transition-colors ${
                value === option.value
                  ? "bg-violet-600 text-white"
                  : "text-zinc-700 hover:bg-violet-100 dark:text-white dark:hover:bg-violet-900/40"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
