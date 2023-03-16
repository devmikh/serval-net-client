import LoginForm from "@/components/LoginForm/LoginForm";
import Head from "next/head";

export default function Login() {
    return(
        <>
            <Head>
                <title>Sign in</title>
            </Head>
            <LoginForm />
        </>
    );
}