import { useState, useEffect } from "react";

export default function useEmployees(id) {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

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

        setEmployees(list);

        if (id) {
          const found = list.find((emp) => emp[3] === id);
          setEmployee(found);
        }

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  return { employees, employee, loading };
}