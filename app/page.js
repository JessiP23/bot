import Dashboard from "./components/Dashboard";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Autonomous Financial Advisor & Trading Bot</h1>
      <Dashboard />
    </div>
  );
}