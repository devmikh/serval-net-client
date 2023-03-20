import UserProfile from "@/components/UserProfile";
import avatar from "../../../public/images/avatar.jpg";
import Post from "@/components/User/Post";

const UserProfilePage = () => {
    return (
        <Post
            avatar={avatar}
            fullName={'Mikhail Serebriakov'}
            username={'misha'}
            date={'1 day ago'}
            text={'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu'}
        />
    )
}

export default UserProfilePage;