import HomePage from "@/components/HomePage/HomePage";
import withAuth from "@/components/withAuth";

const Home = (props: any) => {
    return <HomePage { ...props } />
}

export default withAuth(Home);