"use client";
import React from 'react'
import { useParams } from "next/navigation";
function Brand() {
     const { id } = useParams();
  return (
    <div>Brand</div>
  )
}

export default Brand