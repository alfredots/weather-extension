import { useAppContentScriptModel } from '@/content-script/components/AppContentScript/app-content-script-model';
import { ShadowDom } from '@/shared/components/ShadowDom';
import { WeatherCard } from '@/shared/components/WeatherCard';

type AppContentScriptViewProps = ReturnType<typeof useAppContentScriptModel>;

export const AppContentScriptView = (props: AppContentScriptViewProps) => {
  const { isActive, options, getWeatherData, setIsActive } = props;

  return isActive && options?.homeCity ? (
    <ShadowDom id="overlay-content">
      <div style={{ position: 'fixed', left: '5%', top: '15%', maxWidth: '240px', maxHeight: '240px', backgroundColor: '#f5f5f5' }}>
        <WeatherCard
          city={options.homeCity}
          tempScale={options.tempScale}
          getWeatherData={getWeatherData}
          onDelete={() => setIsActive(false)}
          isModal={true}
        />
      </div>
    </ShadowDom>
  ) : null;
};
