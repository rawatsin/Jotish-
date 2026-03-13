import { useEffect } from "react";

export default function List() {

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
        console.log(data);
      });
  }, []);

  return (
    <div >
      Employees are below
    </div>
  );
}
