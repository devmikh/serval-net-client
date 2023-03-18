import Login from "@/components/Login/Login";
import Head from "next/head";

export default function LoginPage() {
    return(
        <>
            <Head>
                <title>Sign in</title>
            </Head>
            <Login />
        </>
    );
}