export default function SpecificationTable({ product }) {
  const rows = [
    { label: 'HS Code', value: product.hsCode },
    { label: 'Botanical Name', value: product.botanicalName },
    { label: 'Category', value: product.category },
    { label: 'Grade', value: product.grade },
    { label: 'Moisture', value: product.moisture },
    { label: 'Country of Origin', value: product.countryOfOrigin },
    { label: 'Minimum Order Quantity', value: product.minimumOrderQuantity },
    { label: 'Packaging', value: product.packaging?.join(', ') },
    { label: 'Availability', value: product.availability },
    { label: 'Price Basis', value: product.priceBasis },
  ].filter((row) => row.value);

  return (
    <div className="overflow-hidden rounded-xl border border-navy-100">
      {/* Table on sm+, stacked cards on mobile — no horizontal scrolling */}
      <table className="hidden w-full text-sm sm:table">
        <tbody>
          {rows.map((row, idx) => (
            <tr key={row.label} className={idx % 2 === 0 ? 'bg-white' : 'bg-navy-50/60'}>
              <th className="w-1/3 px-4 py-3 text-left font-medium text-navy-500">{row.label}</th>
              <td className="px-4 py-3 text-navy-900">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="divide-y divide-navy-100 sm:hidden">
        {rows.map((row) => (
          <div key={row.label} className="flex flex-col px-4 py-3">
            <span className="text-xs font-medium uppercase tracking-wide text-navy-400">{row.label}</span>
            <span className="mt-0.5 text-sm text-navy-900">{row.value}</span>
          </div>
        ))}
      </div>

      {product.specifications?.length > 0 && (
        <>
          <table className="hidden w-full border-t border-navy-100 text-sm sm:table">
            <tbody>
              {product.specifications.map((spec, idx) => (
                <tr key={spec.parameter} className={idx % 2 === 0 ? 'bg-white' : 'bg-navy-50/60'}>
                  <th className="w-1/3 px-4 py-3 text-left font-medium text-navy-500">{spec.parameter}</th>
                  <td className="px-4 py-3 text-navy-900">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="divide-y divide-navy-100 border-t border-navy-100 sm:hidden">
            {product.specifications.map((spec) => (
              <div key={spec.parameter} className="flex flex-col px-4 py-3">
                <span className="text-xs font-medium uppercase tracking-wide text-navy-400">{spec.parameter}</span>
                <span className="mt-0.5 text-sm text-navy-900">{spec.value}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
