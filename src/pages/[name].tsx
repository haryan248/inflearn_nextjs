import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { Store } from '../../types/store';
import styles from '../styles/detail.module.scss';
import DetailHeader from '../../components/home/DetailHeader';
import DetailContent from '../../components/home/DetailContent';
import { useRouter } from 'next/router';
import useCurrentStore from '../../hooks/useCurrentStore';
import { NextSeo } from 'next-seo';

interface Props {
  store: Store;
}

const StoreDetail: NextPage<Props> = ({ store }) => {
  const expanded = true;

  const router = useRouter();
  const { setCurrentStore } = useCurrentStore();

  const goToMap = () => {
    setCurrentStore(store);
    router.push(`
      /?zoom=15&lat=${store.coordinates[0]}&lng=${store.coordinates[1]}
    `);
  };

  return (
    <>
      <NextSeo
        title={store.name}
        description="Next.js 시작하기 강의를 위한 매장 상세 페이지입니다."
        canonical={`https://inflearn-nextjs.vercel.app/${store.name}`}
        openGraph={{
          url: `https://inflearn-nextjs.vercel.app/${store.name}`,
        }}
      />
      <div className={`${styles.detailSection} ${styles.expanded}`}>
        <DetailHeader
          currentStore={store}
          expanded={expanded}
          onClickArrow={goToMap}
        />
        <DetailContent currentStore={store} expanded={expanded} />
      </div>
    </>
  );
};
export default StoreDetail;

// [name] 에 올수있는 후보 작성하는 함수
/** https://nextjs.org/docs/basic-features/data-fetching/get-static-paths */
export const getStaticPaths: GetStaticPaths = async () => {
  const stores = (await import('../../public/stores.json')).default;

  // name 값에 해당하는 것만 경로로 만들어짐
  const paths = stores.map((store) => ({ params: { name: store.name } }));

  // 새로운 매장이 생길수도 있으므로
  // fallback속성을 이용하여
  // false 라면 빌드 타임에 모두 만들고 찾을 수 없다면 404 페이지 만들어줌
  // true 라면 빌드 타임에 경로를 모두 생성 존재하지 않는다면 404로 가진 않음(짧게 로딩을 노출시킬 수 있음)
  // 즉, getStaticProps을 수행할 수 있음

  // blocking 이라면 존재하지 않는다면 404로 가진 않음(짧게 로딩을 노출시킬 수 있음)
  // ui만 블로킹하는 용도(getStaticProps가 완료될때까지)
  return { paths, fallback: false };
};

// getStaticPath 사용시 getStaticProps 필요
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const stores = (await import('../../public/stores.json')).default;
  // param 정보를 통해 store를 넘겨줌
  const store = stores.find((store) => store.name === params?.name);

  return { props: { store } };
};
