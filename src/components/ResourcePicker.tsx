import React, { useCallback, useEffect, useRef, useState } from "react";
import { useCMA } from '@contentful/react-apps-toolkit';
import { EntryCard, Menu, Button, Modal, FormControl, TextInput, Spinner } from "@contentful/f36-components";

const fieldMaps:any = {
  title: [
    'title',
    'name',
    'slug'
  ],
  description: [
    'description',
    'subtitle',
    'text',
    'content'
  ]
}

const resourceCache: Record<string, any> = {};
const getEntryField = (entry: any, field: string):any => {
  const availableLocales = Object.entries(entry?.fields?.[field]|| {})
  return availableLocales.length ? availableLocales[0][1] : ''
}
const getEntryFieldWithFallback = (entry: any, field: string):any => {
  if (fieldMaps[field]) {
    for(const fallbackField of fieldMaps[field]) {
      const result = getEntryField(entry, fallbackField);
      if (result) {
        return result;
      }
    }
  }
  return '';
}


const ResourcePicker = ({value, type, onChange}:ResourcePickerProps) => {
  const cma = useCMA();
  const [entry, setEntry] = useState<any>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isLoading, setLoading] = useState(false);
  const [isModalShown, setModalShown] = useState(false);
  const debounceTimer = useRef<any>(null)
  const [isSearching, setSearching] = useState(false);
  const [modalItems, setModalItems] = useState<any[]>([]);
  const handleOnChange = useCallback((value: string|null|undefined) => {
    onChange({
      target: {
        value,
        type: 'EntrySelector'
      }
    })
  }, [onChange]);
  const handleSearchValueChange = useCallback((ev:any) => {
    if (debounceTimer?.current) {
      clearTimeout(debounceTimer.current);
    }
    setSearchValue(ev?.target?.value || '')
      debounceTimer.current = setTimeout(() => {
      setSearching(true);
      cma[type === 'asset' ? 'asset' : 'entry'].getMany({
        content_type: type,
        query: {
          query: ev?.target?.value || ''
        }
      }).then((response:any) => {
        setSearching(false);
        setModalItems(response.items);
      })
    }, 200);
  }, [setSearchValue, type, cma]);
  useEffect(() => {
    if (value) {
      setLoading(true);
      ( async () => {
        const loadedEntry = resourceCache[value] || await cma.entry.get(value)
        setEntry(loadedEntry);
        setLoading(false);
      })();;
    }
  }, [value])

  const entryFile = entry ? getEntryField(entry, 'file') : null;
  return <div>
    <Modal onClose={() => setModalShown(false)} isShown={isModalShown}>
      {() => (
        <>
          <Modal.Header title={value ? "Change entry" : "Select entry"} onClose={() => setModalShown(false)} />
          <Modal.Content>
            <FormControl>
              <TextInput placeholder="Search for an entry..." value={searchValue} onChange={handleSearchValueChange} />
              <div>
                {isSearching && <Spinner size="small" />}
                {
                  modalItems.map((item:any) => {
                    resourceCache[item.sys.id] = item;
                    const itemFile = getEntryField(item, 'file');
                    return <EntryCard
                      key={item.sys.id}
                      contentType={item?.sys?.contentType?.sys?.id}
                      title={getEntryFieldWithFallback(item, 'title')}
                      description={getEntryFieldWithFallback(item, 'description')}
                      thumbnailElement={
                        itemFile && ('' + itemFile?.contentType).includes('image/') && itemFile?.url ?
                          <img src={itemFile.url+'?&w=125'} alt={itemFile.fileName} /> : undefined
                      }
                      onClick={() => {
                        setEntry(item);
                        handleOnChange(item.sys.id);
                        setModalShown(false);
                      }
                    } />
                  })
                }
              </div>
            </FormControl>
          </Modal.Content>
        </>
      )}
    </Modal>
    {value ? 
      <EntryCard
        contentType='Linked Entry'
        title={getEntryFieldWithFallback(entry, 'title')}
        description={getEntryFieldWithFallback(entry, 'description')}
        thumbnailElement={
          entryFile && ('' + entryFile?.contentType).includes('image/') && entryFile?.url ?
            <img src={entryFile.url+'?&w=125'} alt={entryFile.fileName} /> : undefined
        }
        actions={[
          <Menu.Item onClick={() => setModalShown(true)}>Change</Menu.Item>,
          <Menu.Item onClick={() => handleOnChange(null)}>Remove</Menu.Item>
        ]}
        isLoading={isLoading}
      />
      : <Button onClick={() => setModalShown(true)}>Add content</Button>
    }
  </div>
}

export interface ResourcePickerProps {
  value: any;
  type?: string;
  onChange: (newValue: any) => void;
}

export default ResourcePicker