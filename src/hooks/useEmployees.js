import { useState, useEffect } from "react";

const ITEMS_PER_PAGE = 10; // Loding.. items per page

export default function useEmployees(id) {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [allDataCache, setAllDataCache] = useState(null);

  useEffect(() => {
    fetch("https://backend.jotish.in/backend_dev/gettabledata.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "test",
        password: "123456",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const list = data.TABLE_DATA.data || [];
        setAllDataCache(list);

       
        setEmployees(list.slice(0, ITEMS_PER_PAGE));

        if (id) {
          const found = list.find((emp) => emp[3] === id);
          setEmployee(found);
        }

        setHasMore(list.length > ITEMS_PER_PAGE);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setHasMore(false);
      });
  }, [id]);

  const loadMore = () => {
    if (!allDataCache || loadingMore || !hasMore) return;

    setLoadingMore(true);

   
    setTimeout(() => {
      const currentLength = employees.length;
      const nextBatch = allDataCache.slice(
        currentLength,
        currentLength + ITEMS_PER_PAGE
      );

      setEmployees((prev) => [...prev, ...nextBatch]);
      setHasMore(currentLength + ITEMS_PER_PAGE < allDataCache.length);
      setLoadingMore(false);
    }, 800);
  };

  return { employees, employee, loading, loadingMore, hasMore, loadMore };
}