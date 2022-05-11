import React, { useEffect } from "react";
import { EditorExtensionSDK } from '@contentful/app-sdk';
import { useSDK, useFieldValue } from '@contentful/react-apps-toolkit';
import { Card, Form, FormControl, Heading, TextInput } from "@contentful/f36-components";
import Field from "./Field";

const Section = ({ config, field }: SectionProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const sdk = useSDK<EditorExtensionSDK>();
  const settings = config?.config?.settings || [];
  const blocks = config?.config?.blocks || [];
  const [value, setValue] = useFieldValue<any>(config.field);
  console.log({value})
  useEffect(() => {
    console.log({config, field, value})
  }, [])
  return (
    <div style={{
      width:'90%',
      margin:'1rem auto',
    }}>
      <Card>
        <Heading>{config?.config?.name || 'Section Settings'}</Heading>
        <Form>
          {settings.map((setting: any) => {
            console.log('Hello', {
              value,
              type: typeof value[config.field] === 'undefined',
              v: value[config.field]
            })
            return (
              <FormControl key={`${config.field}|${setting.id}`}>
                <FormControl.Label>{setting.label}</FormControl.Label>
                <Field 
                  setting={setting} 
                  value={!value || typeof value[setting.id] === 'undefined' || value[setting.id] === null ? setting.default : value[setting.id]} 
                  onChange={(newValue: string) => {
                    console.log({value, newValue})
                    setValue({...(value || {}), [setting.id]: newValue})
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
      </Card>
    </div>
  )
  return <h1>Hello {field.toString()} {config.toString()}</h1>
};

export interface SectionProps {
  config: any;
  field: any;
}

export default Section