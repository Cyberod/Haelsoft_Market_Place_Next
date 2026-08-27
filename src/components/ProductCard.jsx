import SmartLink from './SmartLink';

const TYPE_STYLES = {
  pdf:   { label: 'PDF',   bg: 'bg-red-50',    text: 'text-red-500' },
  zip:   { label: 'ZIP',   bg: 'bg-blue-50',   text: 'text-blue-500' },
  figma: { label: 'Figma', bg: 'bg-purple-50', text: 'text-purple-500' },
  psd:   { label: 'PSD',   bg: 'bg-orange-50', text: 'text-orange-500' },
  ppt:   { label: 'PPT',   bg: 'bg-green-50',  text: 'text-green-500' },
  other: { label: 'File',  bg: 'bg-grey',      text: 'text-inactive' },
};



function getInitials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function ProductCard({ product }) {
  const type = TYPE_STYLES[product.product_type] || TYPE_STYLES.other;
  const symbol = product.currency_symbol || product.currency;
  const initials = getInitials(product.seller_name);

  return (
    <SmartLink
      href={`/marketplace/product/${product.slug}`}
      className="group bg-white rounded-2xl border border-grey overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-[#FFF0EB] to-[#FEF7FF] overflow-hidden">
        {product.thumbnail_url ? (
          <img
            src={product.thumbnail_url}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-10 h-10 text-haelsoft-primary opacity-25" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/>
              <path d="M14 2v6h6"/>
            </svg>
          </div>
        )}
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${type.bg} ${type.text}`}>
          {type.label}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* Title */}
        <h3 className="font-semibold text-black text-sm leading-snug line-clamp-2 group-hover:text-haelsoft-primary transition-colors">
          {product.title}
        </h3>

        {/* Short description */}
        {product.description && (
          <p className="text-xs text-inactive line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        {/* Instructor row */}
        <div className="flex items-center gap-2 mt-0.5">
          {product.seller_avatar ? (
            <img
              src={product.seller_avatar}
              alt={product.seller_name}
              className="w-6 h-6 rounded-full object-cover flex-shrink-0"
            />
          ) : (
            <span className="w-6 h-6 rounded-full bg-haelsoft-primary/15 text-haelsoft-primary text-[10px] font-bold flex items-center justify-center flex-shrink-0">
              {initials}
            </span>
          )}
          <span className="text-xs text-inactive truncate">{product.seller_name}</span>
        </div>

        {/* Price + sales row */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-grey">
          <span className="text-haelsoft-primary font-bold">
            {symbol}{Number(product.price).toLocaleString()}
          </span>
          {product.total_sales >= 10 && (
            <span className="text-xs text-inactive">{product.total_sales.toLocaleString()} downloads</span>
          )}
        </div>
      </div>
    </SmartLink>
  );
}
