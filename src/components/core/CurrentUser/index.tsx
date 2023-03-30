import axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Image from 'next/image';

import { clearCurrentUser } from "@/utils/currentUserUtils";

import styles from './index.module.css';

import signOutIcon from '../../../../public/icons/sign-out-solid.svg';

const CurrentUser = () => {
    const currentUser = useSelector((state: any) => state.currentUser);
    const router = useRouter();
    const logout = async () => {
        try {
            const response = await axios.get(`${process.env.SERVER_URL}/api/logout`, { withCredentials: true });
            if (response.data.status === 'success') {
                clearCurrentUser();
            }
        } catch(error) {
            console.error(error);
        }
    }

    const login = () => {
        router.push('/login');
    }

    return (
        <div>
            {currentUser.data ?
                <div onClick={logout} className={styles.button}>
                    <span>@{currentUser.data.username}</span>
                    <Image src={signOutIcon} alt={'icon'} width={24} className={styles.icon} />
                </div> :
                <div onClick={login} className={styles.button}>Sign In</div>
            }
        </div>
    )
}

export default CurrentUser;