import Button from '../Button';
import styles from './index.module.css';

const PostInput = () => {

    const submitPost = (event: any) => {
        event.preventDefault();
        
    }

    return (
        <form className={styles.container} onSubmit={submitPost}>
            <textarea className={styles.textarea} placeholder="What's on your mind?" />
            <button type='submit' className={styles.button}>Post</button>
        </form>
    )
}

export default PostInput;
