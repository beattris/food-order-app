import styles from './Input.module.css';

const Input = (props) => {
    return(
        <div className={styles.input}>
            <label htmlFor={props.input.div}>{props.label}</label>
            {/* using {...props.input} makes the input configurable, in that;
            we can pass in any input attributes (type, id, etc) to the component */}
            <input {...props.input} />
        </div>
    )
}

export default Input;