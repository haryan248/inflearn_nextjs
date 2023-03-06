import { Fragment } from 'react';
import Link from 'next/link';
import Header from '../../components/common/Header';
import styles from '../../src/styles/header.module.scss';
import { VscFeedback } from 'react-icons/vsc';
import { AiOutlineShareAlt } from 'react-icons/ai';
export default function Home() {
  return (
    <Fragment>
      <Header
        rightElements={[
          <button
            onClick={() => {
              window.alert('복사');
            }}
            className={styles.box}
            style={{ marginRight: 0 }}
            key="button"
          >
            <AiOutlineShareAlt size={20}></AiOutlineShareAlt>
          </button>,
          <Link href="/feedback" className={styles.box} key="link">
            <VscFeedback size={20}></VscFeedback>
          </Link>,
        ]}
      ></Header>
      <main></main>
    </Fragment>
  );
}
