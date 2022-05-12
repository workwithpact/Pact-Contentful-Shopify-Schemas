import React, { useEffect } from "react";
import { EditorExtensionSDK } from '@contentful/app-sdk';
import { useSDK, useFieldValue } from '@contentful/react-apps-toolkit';
import { Button, Card, Form, FormControl, Heading, Menu, TextInput } from "@contentful/f36-components";
import Field from "./Field";
import Settings from "./Settings";

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
        <Settings settings={settings} value={value} setValue={setValue} config={config} />

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
                <Settings
                  config={matchingConfig}
                  settings={matchingConfig?.settings || []}
                  value={block}
                  setValue={(newValue: any) => {
                    const currentBlocks = value?.blocks || [];
                    currentBlocks[index] = {
                      ...(block || {}),
                      ...newValue || {}
                    }
                    setValue({
                      ...(value || {}),
                      blocks: [
                        ...currentBlocks
                      ]
                    })
                  }}
                />
              </Card>
            )
          })
        }
      </Card>
    </div>
  )
};

export interface SectionProps {
  config: any;
  field: any;
}

export default Section