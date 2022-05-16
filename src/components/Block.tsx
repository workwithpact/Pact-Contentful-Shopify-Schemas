import { Button, Card, Collapse, Menu, ModalConfirm, Text } from "@contentful/f36-components";
import React, { useState } from "react";
import Settings from "./Settings";
import * as icons from '@contentful/f36-icons';

const defaultIcon = 'SettingsIcon';
const Block = ({block, config, onChange, onRemove, withDragHandle, dragHandleRender} : BlockProps) => {
  const [isModalShown, setModalShown] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
      <Card 
        title={block.settings?.title || config?.name || `Unknown block ${block.type}`}
        style={{
          marginBottom: '10px',
          padding: !isExpanded && withDragHandle ? '10px 10px 10px 30px' : undefined
        }}
        icon={(icons as any)[config?.icon || defaultIcon]}
        {
          ...{
            withDragHandle: !isExpanded && withDragHandle
          }
        }
        dragHandleRender={!isExpanded && dragHandleRender}
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
        <Button size="small" style={{margin: "auto auto"}} onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? 'Collapse' : 'Expand'}</Button>
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
      </Card>
  )
}

export interface BlockProps {
  block: any;
  config: any;
  onChange: (newValue: any) => void;
  onRemove: (newValue: any) => void;
  withDragHandle?: boolean;
  dragHandleRender?: any;
}

export default Block