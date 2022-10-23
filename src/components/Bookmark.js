import React from "react";
import Tag from "./Tag";

export default function Bookmark({ bookmark }) {
  const { title, url, comment, tagsCollection } = bookmark;
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{comment}</p>
        <a className="text-sky-500 font-bold" href={url}>
          Visit it
        </a>
      </div>
      <div className="px-6 pt-4 pb-2">
        {tagsCollection.items.map((tag) => {
          return <Tag tag={tag} key={tag.sys.id} />;
        })}
      </div>
    </div>
  );
}
