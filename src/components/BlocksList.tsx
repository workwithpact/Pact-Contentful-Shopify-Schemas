import React from "react";
import Block from "./Block";

const BlocksList = ({blocks, config, onChange}: BlocksListProps)  => {
  return (
    <div>
      {
        (blocks || []).map((block:any, index: number) => {
          const matchingConfig = config?.config?.blocks?.find((b:any) => b.type === block.type);
          return (
            <Block
              key={`${config.field}|${block.id}`}
              block={block}
              config={matchingConfig}
              isExpanded={true}
              onRemove={() => {
                onChange(blocks.filter((b:any) => b !== block))
              }}
              onChange={(newValue: any) => {
                const currentBlocks = blocks || [];
                  currentBlocks[index] = {
                    ...(block || {}),
                    ...newValue || {}
                  }
                  onChange(currentBlocks);
              }}
            />
            
          )
        })
      }
    </div>
  )
}

export interface BlocksListProps {
  blocks: any[];
  config: any;
  onChange: (newValue: any) => void;
}
export default BlocksList