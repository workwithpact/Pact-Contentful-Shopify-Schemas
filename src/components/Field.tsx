import { TextInput, Select, Textarea, Subheading, Text, Checkbox } from "@contentful/f36-components";
import React from "react";

const Field = ({ setting, value, onChange }: FieldProps) => {
  const handleOnChange = (event:any) => onChange && event?.target ?  onChange((event.target as any).value) : null;
  switch (setting.type) {
    case "header": 
      return setting.content ? <Subheading>{setting.content}</Subheading> : null;
    case "paragraph": 
      return setting.content ? <Text>{setting.content}</Text> : null;
    case "text":
      return <TextInput value={value} onChange={handleOnChange} />;
    case "checkbox":
      return <Checkbox
        isChecked={value}
        onChange={handleOnChange}
      >
        {setting.label}
      </Checkbox>
    case "textarea":
      return <Textarea value={value} onChange={handleOnChange} />;
    case "number":
      return <TextInput type="number" min={setting.min || null} max={setting.max || null} value={value} onChange={handleOnChange} />;
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
  return <>Unknown field type: {setting?.type}</>
}

export interface FieldProps {
  setting: any;
  value: any;
  onChange?: (newValue: any) => void;
}

export default Field;