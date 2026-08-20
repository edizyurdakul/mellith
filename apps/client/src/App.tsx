import { useApiaries } from "./hooks/useApiaries";

function App() {
  const { data, isLoading, error } = useApiaries();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading apiaries</p>;
  if (!data) return null;

  return (
    <ul>
      {data.map((a) => (
        <li key={a.id} className="flex flex-col gap-4">
          <span>{a.name}</span>
          <span>{a.id}</span>
          <span>{a.lat}</span>
          <span>{a.lon}</span>
          <span>{a.createdAt}</span>
        </li>
      ))}
    </ul>
  );
}

export default App;
