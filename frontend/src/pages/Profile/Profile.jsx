import SidebarProfile from "./SidebarProfile";
import MainProfile from "./MainProfile/MainProfile";

function Profile() {
  return (
    <div className="h-full min-h-px overflow-x-hidden">
      <div className="md: flex flex-col justify-center overflow-hidden pt-9 md:flex-row">
        <SidebarProfile />
        <MainProfile />
      </div>
    </div>
  )
}

export default Profile;