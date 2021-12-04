import React, { useCallback, useEffect, useRef, useState } from 'react';
import Picker, { PickerSelectProps } from 'react-native-picker-select';
import { useField } from '@unform/core';
import { StyleSheet } from 'react-native';
import { Container, Content, Label } from './styles';

const Select = ({ name, items, label, parentCallback, valueDefault, ...rest }) => {
  const pickerRef = useRef(null);
  const { fieldName, registerField, defaultValue = '' } = useField(name);
  const [selectedValue, setSelectedValue] = useState(valueDefault ?? defaultValue);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: pickerRef.current,
      getValue: ref => {
        return ref.props.value || '';
      },
      clearValue: ref => {
        ref.props.onValueChange(ref.props.placeholder.value);
      },
      setValue: (_, value) => {
        setSelectedValue(value);
      },
    });
    
  }, [fieldName, registerField]);
  return (
    <Container>
      <Label>{label}</Label>
      <Content>
      <Picker
        ref={pickerRef}
        value={selectedValue}
        style={pickerSelectStyles}
        onValueChange={(value) => {setSelectedValue(value); parentCallback(value)}}
        items={items}
        placeholder={{ label: "Selecione um item", value: null }}
        {...rest}
      />
      </Content>
    </Container>

  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "#313131",
  },
  inputAndroid: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "#313131",
  },
});

export default Select;