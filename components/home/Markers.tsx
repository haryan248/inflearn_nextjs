import React from 'react';
import useSWR from 'swr';
import { MAP_KEY } from '../../hooks/useMap';
import { STORE_KEY } from '../../hooks/useStores';
import useCurrentStore, {
  CURRENT_STORE_KEY,
} from '../../hooks/useCurrentStore';
import type { ImageIcon, NaverMap } from '../../types/map';
import type { Store } from '../../types/store';
import Marker from './Marker';

const Markers = () => {
  const { data: map } = useSWR<NaverMap>(MAP_KEY);
  const { data: stores } = useSWR<Store[]>(STORE_KEY);

  const { data: currentStore } = useSWR<Store>(CURRENT_STORE_KEY);
  const { setCurrentStore, clearCurrentStore } = useCurrentStore();

  if (!map || !stores) return null;
  return (
    <>
      {stores.map((store) => {
        return (
          <Marker
            map={map}
            coordinates={store.coordinates}
            icon={generateStoreMarkerIcon(store.season, false)}
            onClick={() => {
              setCurrentStore(store);
            }}
            key={store.nid}
          />
        );
      })}
      {currentStore && (
        <Marker
          map={map}
          coordinates={currentStore.coordinates}
          icon={generateStoreMarkerIcon(currentStore.season, true)}
          onClick={clearCurrentStore}
          key={currentStore.nid}
        />
      )}
    </>
  );
};
export default Markers;

const MARKER_HEIGHT = 64;
const MARKER_WIDTH = 54;
const NUMBER_OF_MARKER = 13;
const SCALE = 2 / 3;

const SCALED_MARKER_WIDTH = MARKER_WIDTH * SCALE;
const SCALED_MARKER_HEIGHT = MARKER_HEIGHT * SCALE;

export function generateStoreMarkerIcon(
  markerIndex: number,
  isSelected: boolean
): ImageIcon {
  /** https://navermaps.github.io/maps.js.ncp/docs/tutorial-8-marker-retina-sprite.example.html */
  return {
    url: isSelected ? 'images/markers-selected.png' : 'images/markers.png',
    size: new naver.maps.Size(SCALED_MARKER_WIDTH, SCALED_MARKER_HEIGHT),
    origin: new naver.maps.Point(SCALED_MARKER_WIDTH * markerIndex, 0),
    scaledSize: new naver.maps.Size( // 스프라이트 전체 크기를 리사이징
      SCALED_MARKER_WIDTH * NUMBER_OF_MARKER,
      SCALED_MARKER_HEIGHT
    ),
  };
}
