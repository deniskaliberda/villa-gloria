"use client";

interface BlogComparisonTableProps {
  headers: string[];
  rows: string[][];
  caption?: string;
  highlightColumn?: number;
}

export function BlogComparisonTable({
  headers,
  rows,
  caption,
  highlightColumn,
}: BlogComparisonTableProps) {
  return (
    <div className="not-prose my-8">
      {caption && (
        <p className="mb-3 font-display text-sm font-semibold text-dark-light">
          {caption}
        </p>
      )}
      <div className="overflow-x-auto rounded-card border border-sand-300 shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-terracotta-500 text-white">
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="whitespace-nowrap px-4 py-3 font-display font-semibold"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={
                  rowIndex % 2 === 0 ? "bg-white" : "bg-sand-50"
                }
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`px-4 py-3 text-dark-light ${
                      cellIndex === 0 ? "font-semibold text-dark" : ""
                    } ${
                      highlightColumn !== undefined &&
                      cellIndex === highlightColumn
                        ? "bg-terracotta-50 font-semibold text-terracotta-700"
                        : ""
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
