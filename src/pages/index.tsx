import Home from "@/components/Home";
import withAuth from "@/components/withAuth";

const HomePage = (props: any) => {
    return <Home { ...props } />
}

export default withAuth(HomePage);