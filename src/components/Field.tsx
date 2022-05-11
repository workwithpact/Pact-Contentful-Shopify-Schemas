import { TextInput, Select, Textarea } from "@contentful/f36-components";
import React, { FormEvent } from "react";

const Field = ({ setting, value, onChange }: FieldProps) => {
  console.log({setting})
  const handleOnChange = (event:any) => onChange && event?.target ?  onChange((event.target as any).value) : null;
  switch (setting.type) {
    case "text":
      return <TextInput value={value} onChange={handleOnChange} />;
    case "textarea":
      return <Textarea value={value} onChange={handleOnChange} />;
    case "select":
      return (
        <Select
          id={setting.id}
          value={value}
          onChange={handleOnChange}
        >
          {(setting.options || []).map((option: any, i:number) => {
            return (
              <Select.Option key={i} value={typeof option.value !== 'undefined' ? option.value : option}>{option?.label || option?.value || option}</Select.Option>
            );
          })};
        </Select>
      )
    // case "boolean":
      // return null
  }
  return <>Unknown field type</>
}

export interface FieldProps {
  setting: any;
  value: any;
  onChange?: (newValue: any) => void;
}

export default Field;