import { Provider } from 'react-redux';
import store from '../store/store';
import type { AppProps } from 'next/app';
import Notifications from '@/components/core/Notifications';
import './styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
            <Notifications />
        </Provider> 
    )
}
