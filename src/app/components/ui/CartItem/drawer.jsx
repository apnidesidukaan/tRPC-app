import React from 'react'
// this will be used to render the item in the cart drawer
export default function drawer({item}) {
  return (
            <div key={item.id} className="flex gap-3 border p-3 rounded-xl shadow-sm bg-gray-50">
              <img
                src={item.image}
                alt={item.title}
                className="w-14 h-14 object-contain rounded bg-white border"
              />
              <div className="flex-1 text-sm">
                <div className="font-medium">{item.title}</div>
                <div className="text-xs text-muted mt-0.5">{item.quantityText}</div>

                {/* Qty Control */}
                <div className="flex gap-2 mt-2">
                  <button className="bg-gray-200 px-2 py-1 rounded">−</button>
                  <span className="min-w-[20px] text-center">{item.quantity}</span>
                  <button className="bg-gray-200 px-2 py-1 rounded">+</button>
                </div>
              </div>

              {/* Price */}
              <div className="text-right text-sm mt-1 min-w-[60px]">
                {item.discountedPrice && item.discountedPrice < item.price ? (
                  <>
                    <div className="line-through text-xs text-muted">₹{item.price}</div>
                    <div className="text-green-600 font-semibold">₹{item.discountedPrice}</div>
                  </>
                ) : (
                  <div className="text-green-600 font-semibold">₹{item.price}</div>
                )}
              </div>
            </div>
  )
}
