import React, { ChangeEvent } from 'react';
import type { Feedback } from '../../types/feedback';
import FeedbackList from './FeedbackList';
import NewFeedbackInput from './NewFeedbackInput';
import styles from '../../styles/feedback.module.scss';

interface Props {
  feedbackList: Feedback[];
  newFeedbackContent?: Feedback['content'];
  onChangeNewFeedbackContent?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const FeedbackBoardComponent = ({
  feedbackList,
  newFeedbackContent,
  onChangeNewFeedbackContent,
}: Props): React.ReactElement => {
  return (
    <div className={styles.feedbackBoard}>
      <FeedbackList feedbackList={feedbackList} />
      {newFeedbackContent !== undefined &&
        onChangeNewFeedbackContent !== undefined && (
          <NewFeedbackInput
            newFeedbackContent={newFeedbackContent}
            onChangeNewFeedbackContent={onChangeNewFeedbackContent}
          />
        )}
    </div>
  );
};

export default FeedbackBoardComponent;
