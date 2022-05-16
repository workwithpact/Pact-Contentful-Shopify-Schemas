import { DragHandle, Flex } from "@contentful/f36-components";
import React, {ComponentClass} from "react";
import Block from "./Block";
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import {arrayMoveImmutable as arrayMove} from 'array-move';

const SortableList: ComponentClass<any, any> = SortableContainer((props: any) => (
  <Flex flexDirection="column">{props.children}</Flex>
));

const SortableDragHandle = SortableHandle(() => (
  <DragHandle style={{position: 'absolute', top:0, left: 0, bottom: 0}} label="Move card" className="dragHandle" />
));
const component = ({children}: {children: JSX.Element|Element}) => children;

const SortableBlock:ComponentClass<any, any> = SortableElement(component);

const BlocksList = ({blocks, config, onChange}: BlocksListProps)  => {

  const swapItems = React.useCallback(
    ({ oldIndex, newIndex }: any) => {
      const newItems = arrayMove(blocks, oldIndex, newIndex);
      onChange(newItems);
    },
    [blocks, onChange],
  );

  return (
    <SortableList
    useDragHandle
    axis="y"
    distance={10}
    onSortEnd={({ oldIndex, newIndex }: any) => {
      swapItems({ oldIndex, newIndex });
    }}
    shouldCancelStart={(event:any) => {
      const element = event.target;
      const closest = element.closest('.dragHandle')
      if (closest || (element && element.classList && element.classList.includes && element.classList.includes('dragHandle'))) {
        return false
      }
      return true;
    }}
    >
      {
        (blocks || []).map((block:any, index: number) => {
          const matchingConfig = config?.config?.blocks?.find((b:any) => b.type === block.type);
          return (
            <SortableBlock index={index}>
              <Block
                dragHandleRender={() => <SortableDragHandle />}
                withDragHandle
                key={`${config.field}|${index}`}
                block={block}
                config={matchingConfig}
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
            </SortableBlock>
            
          )
        })
      }
    </SortableList>
  )
}

export interface BlocksListProps {
  blocks: any[];
  config: any;
  onChange: (newValue: any) => void;
}
export default BlocksList