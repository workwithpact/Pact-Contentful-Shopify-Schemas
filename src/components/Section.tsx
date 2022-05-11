import React, { useEffect } from "react";
import { EditorExtensionSDK } from '@contentful/app-sdk';
import { useSDK, useFieldValue } from '@contentful/react-apps-toolkit';
import { Button, Card, Form, FormControl, Heading, Menu, TextInput } from "@contentful/f36-components";
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
            let fieldValue = typeof setting.default !== 'undefined' ? setting.default : ''; 
            if (value && value.settings && typeof value.settings[setting.id] !== 'undefined' && value.settings[setting.id] !== null) {
              fieldValue = value.settings[setting.name]
            }
            console.log({fieldValue, config, setting})
            return (
              <FormControl key={`${config.field}|${setting.id}`}>
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

        {
          !blocks.length ? null : (
            <>
              <hr />
              <Menu>
                <Menu.Trigger>
                  <Button>Add block</Button>
                </Menu.Trigger>
                <Menu.List>
                  {
                    blocks.map((block: any) => {
                      return (
                        <Menu.Item key={`${config.field}|${block.id}`} onClick={() => {
                            setValue({
                              ...(value || {}),
                              blocks: [
                                ...(value?.blocks || []),
                                {
                                  id: block.id,
                                  type: block.type,
                                  settings: {}
                                }
                              ]
                            })
                          }}>{block.name}
                        </Menu.Item>
                      )})
                  }
                </Menu.List>
              </Menu>
            </>
          )
        }
        {
          (value?.blocks || []).map((block:any, index: number) => {
            const matchingConfig = config?.config?.blocks?.find((b:any) => b.type === block.type);
            return (
              <Card key={`${config.field}|${index}`}>
                <Heading>{block.settings?.title || matchingConfig?.name || `Unknown block ${block.type}`}</Heading>
              </Card>
            )
          })
        }
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