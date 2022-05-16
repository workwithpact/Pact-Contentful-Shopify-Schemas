import { Form, FormControl } from "@contentful/f36-components";
import React from "react";
import Field from "./Field";

const Settings = ({settings, value, setValue, config}: SettingsProps) => {
  return (
    <Form>
      {settings.map((setting: any, index:number) => {
        let fieldValue = typeof setting.default !== 'undefined' ? setting.default : ''; 
        if (value && value.settings && typeof value.settings[setting.id] !== 'undefined' && value.settings[setting.id] !== null) {
          fieldValue = value.settings[setting.id]
        }
        return (
          <FormControl key={`${config.field}|${setting.id}|${index}`}>
            <FormControl.Label>{setting.label}</FormControl.Label>
            <Field 
              setting={setting} 
              value={fieldValue} 
              onChange={(newValue: string) => {
                setValue({
                  ...(value || {}), 
                  settings: {
                    ...(value?.settings || {}),
                    [setting.id]: newValue
                  }
                })
              }}
              />
            {setting?.info ? 
              <FormControl.HelpText>
                {setting.info}
              </FormControl.HelpText> : null
            }
          </FormControl>
        );
      })}
    </Form>
  )
}

export interface SettingsProps {
  settings: any;
  value: any;
  config: any;
  setValue: (newValue: any) => void;
}

export default Settings