import { NextResponse,NextRequest } from "next/server";
export const GET=async function(req:NextRequest,res:NextResponse){
  const data=await fetch("https://api.example.com/inventory");
  const json=await data.json();
  return NextResponse.json(json);
}