"use client";

import React from "react";

const BackgroundGlow = () => {
  return (
    
    <div className="pointer-events-none absolute inset-0 ">
      <div className="absolute  left-1/2 top-1/3 size-125 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute  -right-20 bottom-0 size-100 rounded-full bg-secondary/10 blur-[100px]" />
    </div>
  );
};

export default BackgroundGlow;
