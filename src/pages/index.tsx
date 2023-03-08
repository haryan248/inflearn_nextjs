import { Fragment, useEffect } from 'react';
import Header from '../../components/home/Header';
import MapSection from '../../components/home/MapSection';
import DetailSection from '../../components/home/DetailSection';
import { NextPage } from 'next';
import { Store } from '../../types/store';
import useStores from '../../hooks/useStores';
import { NextSeo } from 'next-seo';

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
      <NextSeo
        title="매장 지도"
        description="Next.js 시작하기 강의를 위한 매장 지도 서비스입니다."
        canonical="https://inflearn-nextjs.vercel.app"
        openGraph={{
          url: 'https://inflearn-nextjs.vercel.app',
        }}
      />
      <Header />
      <main
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <MapSection />
        <DetailSection />
      </main>
    </Fragment>
  );
};
export default Home;

// api 로직과 ui 로직을 분리할 수 있음
// 클라이언트 단 로직을 수정하는것이 아니라
// api 폴더 하위의 코드만 수정하면됌
// 백앤드와 프론트의 결합도를 낮춰줌
// 실제 백엔드 url 노출을 막을 수 있음

export async function getStaticProps() {
  // API 추가
  // NEXT_PUBLIC으
  const stores = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stores`
  ).then((response) => response.json());
  // const stores = (await import('../../public/stores.json')).default;

  return {
    props: { stores },
    revalidate: 60 * 60,
  };
}
