import { useAuth } from "../context/authContext";

export default function AreaStudent() {
  const { user } = useAuth();
  return (
    <>
      <div>Hola profesor {user.userName}</div>
    </>
  );
}
