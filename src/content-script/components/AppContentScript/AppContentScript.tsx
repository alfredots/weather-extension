import { useMemo } from 'react';
import { makeGetWeatherData } from '@/main/use-cases';
import { useAppContentScriptModel } from '@/content-script/components/AppContentScript/app-content-script-model';
import { AppContentScriptView } from '@/content-script/components/AppContentScript/AppContentScriptView';

export const AppContentScript = () => {
  const getWeatherData = useMemo(() => makeGetWeatherData(), []);
  const methods = useAppContentScriptModel({ getWeatherData });

  return <AppContentScriptView {...methods} />;
};
