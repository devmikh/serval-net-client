import Home from "@/components/Home/Home";
import withAuth from "@/components/withAuth";

const HomePage = (props: any) => {
    return <Home { ...props } />
}

export default withAuth(HomePage);