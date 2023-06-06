// import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { getTopStories } from "../services/hacker-news";
import Story from "../components/Story";
import { useState } from "react";
const TopStories = () => {
  //   const { data } = useSWR("stories", () =>
  //     getTopStories(1, 10)
  //   );

  const { data, isLoading, size, setSize } = useSWRInfinite(
    (index) => `stories/${index + 1}`,
    (key) => {
      const [,page] = key.split('/')
      return getTopStories(Number(page), 5)
    }
  );


  const stories = data?.flat()

  return (
    <div>
      <h1>Top Stories</h1>
      <ul style={{ listStyle: "none" }}>
        {stories?.map((id: number, index: number) => (
          <li key={id}>
            <Story id={id} index={index} />
          </li>
        ))}
      </ul>
      <button onClick={() => setSize(size + 1)}>load more</button>
    </div>
  );
};
export default TopStories;
