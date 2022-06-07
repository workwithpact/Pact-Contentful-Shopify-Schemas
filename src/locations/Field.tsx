import React, { useEffect, useState } from 'react';
import { Flex, Paragraph, Spinner, Text } from '@contentful/f36-components';
import { FieldExtensionSDK } from '@contentful/app-sdk';
import { useCMA, useSDK } from '@contentful/react-apps-toolkit';
import Section from '../components/Section';
const Field = () => {
  const sdk = useSDK<FieldExtensionSDK>();
  sdk.window.startAutoResizer();
  const [config, setConfig] = useState<any[]|null>(null);
  const cma = useCMA();
  useEffect(() => {
    cma.entry.getMany({
      query: {
        content_type: "customFieldDefinitions"
      }
    }).then((entries: any) => {
      const currentType = sdk.entry.getSys().contentType.sys.id;
      const fields = {
        [sdk.field.id]: sdk.entry.fields[sdk.field.id]
      };
      const matchingConfigs = (entries?.items || []).map((entry: any) => {
        let currentConfig = entry?.fields?.config;
        currentConfig = currentConfig && Object.keys(currentConfig).length > 0 ? currentConfig[Object.keys(currentConfig).shift() || ''] : null;
        let currentTitle = entry?.fields?.title;
        currentTitle = currentTitle && Object.keys(currentTitle).length > 0 ? currentTitle[Object.keys(currentTitle).shift() || ''] : null;
        let currentModels = entry?.fields?.models;
        currentModels = currentModels && Object.keys(currentModels).length > 0 ? currentModels[Object.keys(currentModels).shift() || ''] : null;
        return {
          config: currentConfig,
          models: currentModels,
          title: currentTitle
        }
      }).filter((currentConfig: any) => {
        return (currentConfig.models || []).find((model: string) => {
          const parts = model.split(':');
          const type = parts.shift();
          const field = parts.shift() || '';
          return (type === currentType || type === '*') && fields[field];
        })
      });
      const finalConfig:any = {}
      matchingConfigs.forEach((currentConfig:any) => {
        (currentConfig.models || []).forEach((model: string) => {
          const parts = model.split(':');
          const type = parts.shift();
          const field = parts.shift() || '';
          if (type === currentType || (type === '*' && fields[field])) {
            finalConfig[field] = {
              name: currentConfig.title,
              ...currentConfig.config
            };
          }
        })
      })
      const configArray:any[] = [];
      Object.keys(finalConfig).forEach((key:string) => {
        configArray.push({
          field: key,
          config: finalConfig[key]
        })
      })
      setConfig(configArray)
    });
  }, [cma, sdk.entry]);
  return config ? (
    config?.length ? <>{config.map((conf) => <Section field={sdk.entry.fields[conf.field]} config={conf} key={conf.field} locale={sdk.field.locale} />)}</> : <Text>Oops, no config found for this content type</Text>
  ) : (
  <Flex>
    <Text marginRight="spacingXs">Loading</Text>
    <Spinner />
  </Flex>
  );
};

export default Field;
