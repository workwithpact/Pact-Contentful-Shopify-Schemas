import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import React from "react";

class RichtextField extends React.Component<RichtextFieldProps, RichtextFieldState> {
  onChange: (newValue: any) => void;
  state: {
    value: string;
  }
  constructor(props: RichtextFieldProps) {
    const {value, onChange} = props;
    super(props);
    this.onChange = onChange;
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: value || '',
    };
  }

  handleChange = (content: string) => {
    this.setState({
        value: content
    })
    this.onChange({
      target: {
        value: content,
        type: 'Richtext'
      }
    });
 };

  render() {
    return (
      <ReactQuill
        value={this.state.value}
        onChange={this.handleChange}
        theme="snow"
        />
    );
  }
}

export default RichtextField;

export interface RichtextFieldProps {
  value: string;
  onChange: (newValue: any) => void;
}

export interface RichtextFieldState {
  value: string;
}