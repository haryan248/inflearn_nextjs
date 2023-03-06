import { useMemo } from 'react';
import { useRouter } from 'next/router';
import Map from './Map';
import Markers from './Markers';
import useMap, { INITIAL_CENTER, INITIAL_ZOOM } from '../../hooks/useMap';
import useCurrentStore from '../../hooks/useCurrentStore';
import type { NaverMap } from '../../types/map';
import type { Coordinates } from '../../types/store';

const MapSection = () => {
  /** url query 로부터 initial zoom, center 값 설정 */
  const router = useRouter();
  /**
   * router.asPath === '/?zoom={}&lat={}&lng={}'
   * https://developer.mozilla.org/ko/docs/Web/API/URLSearchParams
   */
  // query값 가져오기
  const query = useMemo(() => new URLSearchParams(router.asPath.slice(1)), []); // eslint-disable-line react-hooks/exhaustive-deps
  const initialZoom = useMemo(
    () => (query.get('zoom') ? Number(query.get('zoom')) : INITIAL_ZOOM),
    [query]
  );
  const initialCenter = useMemo<Coordinates>(
    () =>
      query.get('lat') && query.get('lng')
        ? [Number(query.get('lat')), Number(query.get('lng'))]
        : INITIAL_CENTER,
    [query]
  );

  /** onLoadMap */

  const { initializeMap } = useMap();
  const { clearCurrentStore } = useCurrentStore();
  const onLoadMap = (map: NaverMap) => {
    initializeMap(map);
    naver.maps.Event.addListener(map, 'click', clearCurrentStore);
  };

  return (
    <>
      <Map onLoad={onLoadMap}></Map>
      <Markers></Markers>
    </>
  );
};

export default MapSection;
