import React, { useState } from "react";
import { useFieldValue } from '@contentful/react-apps-toolkit';
import { Button, Card, Collapse, Flex, Heading, Menu } from "@contentful/f36-components";
import Settings from "./Settings";
import BlocksList from "./BlocksList";

const Section = ({ config, field, locale }: SectionProps) => {
  const settings = config?.config?.settings || [];
  const blocks = config?.config?.blocks || [];
  const [value, setValue] = useFieldValue<any>(config.field, locale);
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div style={{
      width:'90%',
      margin:'1rem auto',
    }}>
      <Card>
        <Flex>
          <Heading>{config?.config?.name || 'Section Settings'}</Heading>
          <Button size="small" style={{margin: "auto 0 auto auto"}} onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? 'Collapse' : 'Expand'}</Button>
        </Flex>
        <Collapse isExpanded={isExpanded}>
          <Settings settings={settings} value={value} setValue={setValue} config={config} />

          {
            !blocks.length ? null : (
              <>
                <hr />
                <Menu>
                  <Menu.Trigger>
                    <Button isFullWidth style={{margin: "1rem 0"}}>Add block</Button>
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
          <BlocksList 
            blocks={value?.blocks || []} 
            config={config} 
            onChange={(newBlocks) => setValue({
              ...(value || {}),
              blocks: [...newBlocks]
            })} />
          </Collapse>
        </Card>
    </div>
  )
};

export interface SectionProps {
  config: any;
  field: any;
  locale?: any;
}

export default Section