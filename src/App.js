import useContenful from "./hooks/use-contentful";
import Person from "./components/Person";
import "./App.css";
import Bookmarks from "./components/Bookmarks";
import { useState } from "react";

const query = `
query ($isPreview: Boolean = false) {
  person(id: "3r9AEVN3TjQBbYHkrFWoUo", preview: $isPreview) {
    name
    socialTwitter
    socialGithub
    socialLinkedin
    bio {
      json
    }
    image {
      title
      url
    }
  }
  allBookmarks: bookmarkCollection {
    items {
      ...bookmarkFields
    }
  }
  favoriteTagCollection: tagCollection(where: {title_contains: "favorite"}, limit: 1, preview: $isPreview) {
    items {
      title
      linkedFrom {
        bookmarkCollection {
          items {
            ...bookmarkFields
          }
        }
      }
    }
  }
}

fragment bookmarkFields on Bookmark {
  sys {
    id
  }
  title
  url
  comment
  tagsCollection(limit: 10) {
    items {
      sys {
        id
      }
      title
    }
  }
}
`;

function App() {
  let [isPreview, setIsPreview] = useState(false);
  let { data, errors } = useContenful(query, isPreview);

  if (errors)
    return (
      <span style={{ color: "red" }}>
        {errors.map((error) => error.message).join(",")}
      </span>
    );
  if (!data) return <span>Loading...</span>;

  const { allBookmarks, favoriteTagCollection, person } = data;
  const favoriteTag = favoriteTagCollection.items[0];

  return (
    <div className="App">
      <div className="p-3">
        <label>
          <input
            type="checkbox"
            className="mr-2"
            checked={isPreview}
            onChange={() => setIsPreview(!isPreview)}
          />
          Show preview
        </label>
      </div>
      <Person person={person} />
      <Bookmarks
        booksmarks={favoriteTag.linkedFrom.bookmarkCollection.items}
        headline="Favorite Bookmarks"
      />
      <Bookmarks booksmarks={allBookmarks.items} headline="Bookmarks" />
    </div>
  );
}

export default App;
