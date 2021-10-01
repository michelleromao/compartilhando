import React, { useRef, useEffect, useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useField } from '@unform/core';
import { IconButton } from 'react-native-paper';

import {EyeOpen, EyeClose} from '../Icons';
import {Container, Label, TextInput, Content} from './styles';

function Input({ name, label, onChangeText, password, show,...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [pwd, setPwd] = useState(password);

  const handleShow = useCallback(() => {
    console.log(pwd);
    setPwd(!pwd);
  }, [pwd])

  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);
  useEffect(() => {
    if (inputRef.current) inputRef.current.value = defaultValue;
  }, [defaultValue]);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue() {
        if (inputRef.current) return inputRef.current.value;
        return '';
      },
      setValue(ref, value) {
        if (inputRef.current) {
          inputRef.current.setNativeProps({ text: value });
          inputRef.current.value = value;
        }
      },
      clearValue() {
        if (inputRef.current) {
          inputRef.current.setNativeProps({ text: '' });
          inputRef.current.value = '';
        }
      },
    });
  }, [fieldName, registerField]);
  const handleChangeText = useCallback(
    text => {
      if (inputRef.current) inputRef.current.value = text;
      if (onChangeText) onChangeText(text);
    },
    [onChangeText],
  );

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <Content>
        <TextInput
          ref={inputRef}
          onChangeText={handleChangeText}
          defaultValue={defaultValue}
          secureTextEntry={pwd ? true : false}
          {...rest}
        />
        {password ? 
          <TouchableOpacity
            style={{width: "13%", height: "100%", justifyContent: "center"}}
            onPress={() => handleShow()}
          >
            {pwd ? <EyeOpen /> : <EyeClose />}
          </TouchableOpacity>
        : <></>}
      </Content>
    </Container>
   )
  }
export default Input;