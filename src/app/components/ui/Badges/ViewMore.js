"use client";
import { useParams, useRouter } from "next/navigation";
import { MdOutlineViewInAr } from "react-icons/md";
import React from "react";
//========================================================================

export default function ViewMore() {
  //========================================================================
  const { id } = useParams()
  console.log('ViewMore', useParams().id);

  const router = useRouter();
  //========================================================================
  return (
    <button
      onClick={() => router.push(`/explore-category/${id}`)}
      className="cursor-pointer flex items-center gap-1 px-3 py-1 rounded-full bg-white text-sm text-gray-800 border border-accent hover:bg-gray-100 transition"
    >
      <span >View All</span>
      < MdOutlineViewInAr size={16} className="text-accent ml-2" />
    </button>
  );
}
//========================================================================