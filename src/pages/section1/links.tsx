import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Links() {
  // useRouter 훅
  // Next Link 사용 권장
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/section1/getStaticProps');
  }, [router]);

  return (
    <main>
      <h1>Links</h1>
      <button
        onClick={() => {
          router.push('/section1/getStaticProps');
        }}
      >
        /getStaticProps
      </button>

      {/* 링크가 보일때만 json 파일을 가져옴 */}
      {/*<div style={{ height: '200vh' }} />*/}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}

      {/* a태그 사용시 새롭게 HTML 파일을 받아옴 */}
      {/* <a href="/section1/getStaticProps">/getStaticProps</a>*/}

      {/* legacyBehavior은 v12의 행동을 그대로 행동함 */}
      {/*<Link href="/section1/getStaticProps">/getStaticProps</Link> */}
      {/** https://github.com/vercel/next.js/blob/canary/packages/next/client/link.tsx#L487 */}
    </main>
  );
}
