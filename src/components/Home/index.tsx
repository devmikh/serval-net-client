import { useSelector } from "react-redux";
import useCheckAuth from "@/hooks/useCheckAuth";

const Home = (props: any) => {

    const currentUser = useSelector((state: any) => state.currentUser);
    useCheckAuth();
    
    return (
        <>
            <h1>Home Page (Protected)</h1>
            <h2>Logged in as: {(currentUser.data ? currentUser.data.username : null)}</h2>
        </>
    )
}

export default Home;
