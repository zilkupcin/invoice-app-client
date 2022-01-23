import styles from "../styles/Forms.module.scss";

const InputField = ({ type, label, value, propertyName, onInputChange }) => {
  const handleInputChange = (e) => {
    onInputChange(propertyName, e.target.value);
  };

  return (
    <div className={styles.container}>
      <label>{label}</label>
      <input onChange={handleInputChange} type={type} value={value} />
    </div>
  );
};

export default InputField;
