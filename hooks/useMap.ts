import { useCallback } from 'react';
import useSWR, { mutate } from 'swr';
import type { Coordinates } from '../types/store';
import type { NaverMap } from '../types/map';

export const INITIAL_CENTER: Coordinates = [37.5262411, 126.99289439];
export const INITIAL_ZOOM = 10;

export const MAP_KEY = '/map';

const useMap = () => {
  const { data: map } = useSWR(MAP_KEY);

  const initializeMap = useCallback((map: NaverMap) => {
    mutate(MAP_KEY, map);
  }, []);

  const resetMapOptions = useCallback(() => {
    /** https://navermaps.github.io/maps.js.ncp/docs/naver.maps.Map.html#morph__anchor */
    map.morph(new naver.maps.LatLng(...INITIAL_CENTER), INITIAL_ZOOM);
  }, [map]);

  const getMapOptions = useCallback(() => {
    const mapCenter = map.getCenter();
    const center: Coordinates = [mapCenter.lat(), mapCenter.lng()];
    const zoom = map.getZoom();

    return { center, zoom };
  }, [map]);

  return {
    initializeMap,
    resetMapOptions,
    getMapOptions,
  };
};
export default useMap;
