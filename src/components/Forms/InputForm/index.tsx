import React from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";
import { TextInputProps } from "react-native";
import { Input } from "../Input";
import { Container, Error } from "./styles";

interface errorType {
  field:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
}

interface InputFormProps extends TextInputProps {
  control: Control;
  name: string;
  error: errorType['field'];
}

export const InputForm = ({
  control,
  name,
  error,
  ...rest
}: InputFormProps) => {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
        name={name}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
};
