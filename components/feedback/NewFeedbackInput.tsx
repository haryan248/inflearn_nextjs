import React, { ChangeEvent } from 'react';
import type { Feedback } from '../../types/feedback';
import { FEEDBACK_COLOR_SET, MAX_CONTENT_LENGTH } from './variables';
import styles from '../../styles/feedback.module.scss';

interface Props {
  newFeedbackContent: Feedback['content'];
  onChangeNewFeedbackContent: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const NewFeedbackInput = ({
  newFeedbackContent,
  onChangeNewFeedbackContent,
}: Props): React.ReactElement => {
  return (
    <div className={`${styles.item} ${styles.inputItem}`}>
      <div
        className={styles.card}
        style={{
          background: `linear-gradient(
              to left top,
              transparent 50%,
              ${FEEDBACK_COLOR_SET['yellow'].secondary} 0
            ) no-repeat 100% 100% / 22px 22px,
            linear-gradient(
              to left top,
              transparent 15.7px,
              ${FEEDBACK_COLOR_SET['yellow'].primary} 0
            )`,
        }}
      >
        <textarea
          className={styles.text}
          value={newFeedbackContent}
          onChange={onChangeNewFeedbackContent}
          placeholder="피드백을 적어주세요!"
        />
        <p
          className={styles.textLength}
        >{`${newFeedbackContent.length} / ${MAX_CONTENT_LENGTH}`}</p>
      </div>
    </div>
  );
};

export default NewFeedbackInput;
