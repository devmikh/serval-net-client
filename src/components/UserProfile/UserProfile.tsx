import { useRouter } from 'next/router';

const UserProfile = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h1>user with id {id}</h1>
        </div>
    )
};

export default UserProfile;