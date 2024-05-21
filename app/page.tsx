import ChatWindows from "./components/ChatWindows";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 border">
      <h1>ChatGPT Interface</h1>
      <ChatWindows />
    </main>
  );
}
