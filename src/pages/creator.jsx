import ListPostCreator from "./ListPostCreator";
import ListPostUser from "./ListPostUser";
import ProfilePage from "./profile/profilecreator";

export default function Creator() {
  return (
    <>
      <div>
        <ProfilePage />
        <ListPostUser />
      </div>
    </>
  );
}