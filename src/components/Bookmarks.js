import React from "react";
import Bookmark from "./Bookmark";

export default function Bookmarks({ booksmarks, headline }) {
  return (
    <section className="mt-6">
      <h2 className="font-bold text-xl text-indigo-600">{headline}</h2>
      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {booksmarks.map((bookmark) => {
          return <Bookmark bookmark={bookmark} key={bookmark.sys.id} />;
        })}
      </div>
    </section>
  );
}
