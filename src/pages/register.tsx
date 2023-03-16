import RegisterForm from "@/components/RegisterForm/RegisterForm";
import Head from "next/head";

export default function Register() {
    return(
        <>
            <Head>
                <title>Sign up</title>
            </Head>
            <RegisterForm />
        </>
    );
}