import React from "react";
import { TextField } from "@mui/material";
import { useController, useForm } from "react-hook-form";
const Input = ({
  control,
  name,
  myHelperFunc,
  placeholder,
  myOnChange,
  rules,
  onBlur,
  isDisabled,
}) => {
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: rules,
    defaultValue: "",
  });
  // console.log("error on text inputs: ",myHelperFunc)
  return (
    <TextField
      disabled={isDisabled}
      className={`input-field ${error && "input-error"}`}
      placeholder={placeholder}
      onChange={myOnChange ? myOnChange : onChange} // send value to hook form
      onBlur={onBlur} // notify when input is touched/blur
      value={value} // input value
      inputRef={ref} // send input ref, so we can focus on input when error appear
      inputProps={{
        maxLength: rules?.maxLength && rules.maxLength,
      }}
      helperText={
        error
          ? myHelperFunc
            ? myHelperFunc[name]
              ? myHelperFunc[name][error.type]
                ? myHelperFunc[name][error.type]
                : "Invalid Input"
              : "Invalid Input"
            : "Invalid Input"
          : " "
      }
      variant="outlined"
    />
  );
};

export default Input;
