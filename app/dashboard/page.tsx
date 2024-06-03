import ChatWindow from "../components/ChatWindows";
import UserInfo from "../components/authentication/UserInfo";

export default function Dashboard() {
  return (
    <div>
      <UserInfo />
      <ChatWindow />
    </div>
  );
}
