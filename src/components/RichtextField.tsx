import { Textarea } from "@contentful/f36-components";
import React from "react";

const RichtextField = ({value, onChange}: RichtextFieldProps) => {
  return <Textarea value={value} onChange={onChange} />; // Todo: Implement WYSIWYG
}

export interface RichtextFieldProps {
  value: any;
  onChange: (newValue: any) => void;
}

export default RichtextField;
