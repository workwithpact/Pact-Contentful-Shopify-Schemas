import { TextInput, Select, Textarea, Subheading, Text, Checkbox, Radio, Stack } from "@contentful/f36-components";
import RichtextField from "./RichtextField";

const Field = ({ setting, value, onChange }: FieldProps) => {
  const handleOnChange = (event:any) => {
    if(onChange && event?.target){
      onChange(event.target.type === 'checkbox' ? event.target.checked : (event.target as any).value)
    }
  };
  switch (setting.type) {
    case "header": 
      return setting.content ? <Subheading>{setting.content}</Subheading> : null;
    case "paragraph": 
      return setting.content ? <Text>{setting.content}</Text> : null;
    case "checkbox":
      return <Checkbox
        isChecked={value}
        onChange={handleOnChange}
      >
        {setting.label}
      </Checkbox>
    case "textarea":
      return <Textarea value={value} onChange={handleOnChange} />;
    case "richtext":
        return <RichtextField value={value} onChange={handleOnChange} />;
    case "number":
    case "text":
    case "url":
    case "password":
    case "search":
      return <TextInput type={setting.type} min={setting.min || null} max={setting.max || null} value={value} onChange={handleOnChange} />;
    case "range":
      return <div>
        <input type="range" value={value} min={setting.min || 0} max={setting.max || 100} step={setting.step || 1} onChange={handleOnChange} /> {value} {setting.unit}
      </div>
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
    case "radio":
      return (
        <Stack flexDirection="row">
          {(setting.options || []).map((option: any, i:number) => {
            return (
              <Radio onChange={handleOnChange} isChecked={(option?.value === value || option === value)} key={i} value={typeof option.value !== 'undefined' ? option.value : option}>{option?.label || option?.value || option}</Radio>
            );
          })}
        </Stack>
        
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