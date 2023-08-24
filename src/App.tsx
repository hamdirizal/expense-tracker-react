import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://pwzlcwvsuiguccmudupi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3emxjd3ZzdWlndWNjbXVkdXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI4NDMzOTIsImV4cCI6MjAwODQxOTM5Mn0.6RbfZQjtxfoyskRMR7xpFNa5MG5yoXxNSSIRGQMnD6E"
);

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data: countries, error } = await supabase
        .from("countries")
        .select();
      console.log(countries, error)
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("user", user);
      if(!user){
        await supabase.auth.signInWithPassword({
          email: '',
          password: '',
        })
        const {
          data: { user },
        } = await supabase.auth.getUser();
        console.log("user after login", user);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
