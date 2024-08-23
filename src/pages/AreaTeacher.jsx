import { useAuth } from "../context/authContext";

export default function AreaTeachert() {
  const { user } = useAuth();
  console.log("Usuario:", user);
  return (
    <>
      <div>Hola profesor {user.userName}</div>
    </>
  );
}
