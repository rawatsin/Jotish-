import { useState } from "react";

export default function useVirtualEmployees({
  employees,
  loadingMore,
  hasMore,
  loadMore,
  loading,
}) {
  const [scrollTop, setScrollTop] = useState(0);

  const ROW_HEIGHT = 57;
  const BUFFER_SIZE = 5;
  const CONTAINER_HEIGHT = 600;
  const SCROLL_THRESHOLD = 300;

  const totalRows = employees.length + (loadingMore ? 5 : 0);
  const visibleRows = Math.ceil(CONTAINER_HEIGHT / ROW_HEIGHT);

  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / ROW_HEIGHT) - BUFFER_SIZE
  );

  const endIndex = Math.min(
    employees.length,
    startIndex + visibleRows + BUFFER_SIZE * 2
  );

  const visibleEmployees = employees.slice(startIndex, endIndex);

  const handleScroll = (e) => {
    const scrollPosition = e.currentTarget.scrollTop;
    const scrollHeight = e.currentTarget.scrollHeight;
    const clientHeight = e.currentTarget.clientHeight;
    const distanceFromBottom = scrollHeight - (scrollPosition + clientHeight);

    setScrollTop(scrollPosition);

    if (
      distanceFromBottom < SCROLL_THRESHOLD &&
      hasMore &&
      !loadingMore &&
      !loading
    ) {
      loadMore();
    }
  };

  return {
    ROW_HEIGHT,
    CONTAINER_HEIGHT,
    startIndex,
    endIndex,
    visibleEmployees,
    handleScroll,
  };
}