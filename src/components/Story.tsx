import { Link } from 'wouter';
import useSWR from "swr";
import { getItemInfo } from "../services/hacker-news";
import { smalllink, story, storyFooter, storyHeader, storyTitle } from './Story.css';
import StoryLoader from './StoryLoader';
import { getRelativeTime } from '../utils/getRelativeTime';
const Story = (props: { id: number; index: number }) => {
  const { id, index } = props;

  const { data, isLoading } = useSWR(`/story/${id}`, () => getItemInfo(id));

  if (isLoading) {
    return <StoryLoader/>;
  }

  const { by, kids, score, title, url, time } = data;

  console.log(data);

  let domain = "";
  try {
    domain = new URL(url).hostname.replace("www.", "");
  } catch (error) {}

  //TODO: create relativeTime
  const relativeTime = getRelativeTime(time)
  return (
    <article className={story}>
      <header className={storyHeader}>
        <small>{index + 1} .</small>
        <a className={storyTitle} href={url} target="_blank" rel="noopener noreferrer">
            {title}
        </a>
        <a className={smalllink} href={url} target="_blank" rel="noopener noreferrer">
            ({domain})
        </a>
      </header>

      <footer className={storyFooter}>
        <span>{score} points</span>
        <Link className={smalllink} href={`/article/${id}`}>
            by {by}
        </Link>
        <Link className={smalllink} href={`/article/${id}`}>
            {relativeTime}
        </Link>
        <Link className={smalllink} href={`/article/${id}`}>
            {kids?.length ?? 0} comments
        </Link>
      </footer>
    </article>
  );
};
export default Story;
