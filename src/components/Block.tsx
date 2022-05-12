import { Card, Heading } from "@contentful/f36-components";
import React from "react";
import Settings from "./Settings";

const Block = ({block, config, isExpanded, onChange} : BlockProps) => {
  return (
    <Card>
      <Heading>{block.settings?.title || config?.name || `Unknown block ${block.type}`}</Heading>
      <Settings
        config={config}
        settings={config?.settings || []}
        value={block}
        setValue={(newValue: any) => {
          onChange(newValue);
        }}
      />
    </Card>
  )
}

export interface BlockProps {
  block: any;
  config: any;
  isExpanded: boolean;
  onChange: (newValue: any) => void;
}

export default Block