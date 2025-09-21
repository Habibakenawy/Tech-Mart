"use client";
import React from 'react'
import { useParams } from "next/navigation";
function Category() {
     const { id } = useParams();
  return (
    <div>
      <h1>Category Page</h1>
      <p>This is where you'll find all the Category page</p>
    </div>
  )
}

export default Category