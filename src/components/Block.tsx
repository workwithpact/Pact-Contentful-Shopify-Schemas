import {  Card, Menu, ModalConfirm, Text } from "@contentful/f36-components";
import React, { useState } from "react";
import Settings from "./Settings";
import * as icons from '@contentful/f36-icons';

const defaultIcon = 'SettingsIcon';
console.log({icons})
const Block = ({block, config, isExpanded, onChange, onRemove} : BlockProps) => {
  const [isModalShown, setModalShown] = useState(false);
  
  return (
    <>
      <Card 
        title={block.settings?.title || config?.name || `Unknown block ${block.type}`}
        icon={(icons as any)[config?.icon || defaultIcon]}
        actions={[
          <Menu.Item onClick={() => setModalShown(true)}>Delete Block</Menu.Item>
        ]}
      >
        <Settings
          config={config}
          settings={config?.settings || []}
          value={block}
          setValue={(newValue: any) => {
            onChange(newValue);
          }}
        />
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
  isExpanded: boolean;
  onChange: (newValue: any) => void;
  onRemove: (newValue: any) => void;
}

export default Block