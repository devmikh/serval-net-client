import UserProfile from "@/components/UserProfile";
import HomeButton from "@/components/core/HomeButton";
import CurrentUser from "@/components/core/CurrentUser";

const UserProfilePage = () => {
    return (
        <div>
            <HomeButton />
            <CurrentUser />
            <UserProfile />
        </div>
        
    );
}

export default UserProfilePage;