import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
import useCheckAuth from "@/hooks/useCheckAuth";

const Home = (props: any) => {
    const router = useRouter();
    const currentUser = useSelector((state: any) => state.currentUser);
    useCheckAuth();
    
    useEffect(() => {
        if (currentUser.data) {
            router.push(`/user/${currentUser.data.id}`);
        }
        router.push
    }, [currentUser]);
    
    return (
        <>
        </>
    )
}

export default Home;
