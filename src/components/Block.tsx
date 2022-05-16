import { Card, Collapse, Menu, ModalConfirm, Text } from "@contentful/f36-components";
import React, { useState } from "react";
import Settings from "./Settings";
import * as icons from '@contentful/f36-icons';

const defaultIcon = 'SettingsIcon';
console.log({icons})
const Block = ({block, config, onChange, onRemove} : BlockProps) => {
  const [isModalShown, setModalShown] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <>
      <Card 
        title={block.settings?.title || config?.name || `Unknown block ${block.type}`}
        icon={(icons as any)[config?.icon || defaultIcon]}
        onClick={() => setIsExpanded(!isExpanded)}
        actions={[
          <Menu.Item onClick={() => setModalShown(true)}>Delete Block</Menu.Item>
        ]}
      >
        <Collapse isExpanded={isExpanded}>
          <Settings
            config={config}
            settings={config?.settings || []}
            value={block}
            setValue={(newValue: any) => {
              onChange(newValue);
            }}
          />
        </Collapse>
      </Card>
      <ModalConfirm
        intent="negative"
        isShown={isModalShown}
        onCancel={() => {
          setModalShown(false);
        }}
        onConfirm={() => {
          setModalShown(false);
          onRemove(null);
        }}
      >
        <Text>Do you really want to delete this block?</Text>
      </ModalConfirm>
    </>
  )
}

export interface BlockProps {
  block: any;
  config: any;
  onChange: (newValue: any) => void;
  onRemove: (newValue: any) => void;
}

export default Block