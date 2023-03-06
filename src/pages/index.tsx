import { Fragment, useEffect } from 'react';
import HomeHeader from '../../components/home/Header';
import MapSection from '../../components/home/MapSection';

import { NextPage } from 'next';
import { Store } from '../../types/store';
import useStores from '../../hooks/useStores';

interface Props {
  stores: Store[];
}

const Home: NextPage<Props> = ({ stores }) => {
  const { initializeStores } = useStores();

  useEffect(() => {
    initializeStores(stores);
  }, [initializeStores, stores]);

  return (
    <Fragment>
      <HomeHeader></HomeHeader>
      <MapSection></MapSection>
    </Fragment>
  );
};

export default Home;

export async function getStaticProps() {
  const stores = (await import('../../public/stores.json')).default;

  return {
    props: { stores },
    revalidate: 60 * 60,
  };
}
