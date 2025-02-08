
import { environments } from "../utils/config"
import ApiRequestForm from "../components/ApiRequestForm"
export default function Home() {
  return (
    <main className="container mx-auto w-[500px] p-4">
      <h1 className="text-2xl font-bold mb-4">API Request App</h1>
      <ApiRequestForm environments={environments} />
    </main>
  );
}
