"use client";
import { MdAccessTime } from "react-icons/md";
import { IconButton } from "../ui/button/iconButton";
import { useRouter } from "next/navigation";

export default function ProductDisplayCard({ product }) {
  
  const router = useRouter();

  return (
    <>
    
      {product?.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl p-3 shadow-sm shadow-accent/10"
        >
          <div className="relative">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-24 sm:h-28 object-contain rounded"
            />
            {product.eta && (
              <div className="absolute top-1 left-1 flex items-center gap-1 bg-accent/10 text-accent text-[10px] sm:text-xs px-2 py-0.5 rounded-full">
                <MdAccessTime className="w-3.5 h-3.5" />
                {product.eta}
              </div>
            )}
          </div>

          <div className="mt-2 text-sm font-medium text-primary-text line-clamp-2 min-h-[40px]">
            {product.title}
          </div>

          <div className="text-xs text-gray-500 mt-1">{product.quantity}</div>

          <div className="mt-2 flex items-center justify-between">
            <div>
              {product.discountedPrice ? (
                <div className="flex flex-col">
                  <span className="text-green-600 font-bold text-sm">
                    ₹{product.discountedPrice}
                  </span>
                  <span className="text-gray-400 text-xs line-through">
                    ₹{product.price}
                  </span>
                </div>
              ) : (
                <span className="text-green-600 font-bold text-sm">
                  ₹{product.price}
                </span>
              )}
            </div>

            <IconButton
              size="sm"
              className="text-xs"
              onClick={() => router.push(`/checkout`)}
            >
              Add +
            </IconButton>
          </div>
        </div>
      ))}
    </>
  );
}
