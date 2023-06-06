import { lazy, Suspense } from "react";
import Header from "./components/Header";
import { Route } from "wouter";

const TopStoriesPage = lazy(() => import("./pages/TopStories"));
const DetailPage = lazy(() => import("./pages/Detail"));

function App() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback='loading...'>
          <Route path="/" component={TopStoriesPage} />
          <Route path="/article/:id" component={DetailPage} />
        </Suspense>
      </main>
    </>
  );
}

export default App;
