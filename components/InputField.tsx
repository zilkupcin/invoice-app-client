import styles from "../styles/Forms.module.scss";
import cn from "classnames";
import { ChangeEvent, ChangeEventHandler, FC } from "react";
import { ValidationErrorItem } from "joi";

interface InputFieldProps {
  type: string;
  label: string;
  value: string | number | undefined;
  propertyName: string;
  groupKey?: string;
  groupIndex?: number;
  onInputChange: (propertyName: string, value: string | number) => void;
  errors: Array<ValidationErrorItem>;
}

const InputField: FC<InputFieldProps> = ({
  type,
  label,
  value,
  propertyName,
  groupKey,
  groupIndex,
  onInputChange,
  errors,
}) => {
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    onInputChange(propertyName, e.target.value);
  };

  const isError = errors?.find((error) => {
    // It's not a grouped input, just check the property name
    if (!groupKey) return error.context?.key === propertyName;

    // If group key doesn't match, return undefined
    if (error.path[0] !== groupKey) return;

    // Check if property name and the index of the item matches
    return error.path[2] === propertyName && error.path[1] === groupIndex;
  });

  return (
    <div
      className={cn(styles.container, {
        [styles["container--error"]]: isError,
      })}
    >
      <label>{label}</label>
      <input onChange={handleInputChange} type={type} value={value} />
    </div>
  );
};

export default InputField;
