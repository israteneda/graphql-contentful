import React from "react";

export default function Tag({ tag }) {
  return (
    <span className="inline-block bg-indigo-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
      {tag.title}
    </span>
  );
}
