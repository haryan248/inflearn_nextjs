import React from 'react';
import type { Feedback } from '../../types/feedback';
import {
  CARD_WIDTH,
  FEEDBACK_COLOR_SET,
  SNAIL_SIDE_LENGTH,
  snailPositionArray,
  pickThemeByTimestamp,
} from './variables';
import styles from '../../styles/feedback.module.scss';

interface Props {
  feedbackList: Feedback[];
}

const FeedbackList = ({ feedbackList }: Props): React.ReactElement => {
  return (
    <>
      {feedbackList.map((feedback, index) => {
        const isOutOfRange = index >= SNAIL_SIDE_LENGTH ** 2;
        const theme = pickThemeByTimestamp(feedback.timestamp);
        return (
          <div
            className={styles.item}
            key={feedback.timestamp}
            style={{
              zIndex: index === 1 ? 1 : 0,
              transform: isOutOfRange
                ? `translate(${-1 * CARD_WIDTH}px, 0)`
                : `translate(
                        ${snailPositionArray[index].col * CARD_WIDTH}px,
                        ${snailPositionArray[index].row * CARD_WIDTH}px
                      )`,
            }}
          >
            <div
              className={styles.card}
              style={{
                background: `linear-gradient(
                    to left top,
                    transparent 50%,
                    ${FEEDBACK_COLOR_SET[theme].secondary} 0
                  ) no-repeat 100% 100% / 22px 22px,
                  linear-gradient(
                    to left top,
                    transparent 15.7px,
                    ${FEEDBACK_COLOR_SET[theme].primary} 0
                  )`,
              }}
            >
              <p className={styles.text}>{feedback.content}</p>
              <div className={`${styles.shadow} ${styles.shadowRight}`} />
              <div className={`${styles.shadow} ${styles.shadowBottom}`} />
              <div className={`${styles.shadow} ${styles.shadowCorner}`} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default React.memo(FeedbackList);
