import React, { useEffect, useState } from 'react';
import type { Feedback } from '../../types/feedback';
import useInput from '../../hooks/useInput';
import FeedbackSubmitButton from './FeedbackSubmitButton';
import FeedbackBoard from './FeedbackBoard';
import {
  generateNewFeedback,
  MAX_CONTENT_LENGTH,
  SNAIL_SIDE_LENGTH,
} from './variables';
import FeedbackBoardContainer from './FeedbackBoardContainer';

interface Props {
  initialFeedbackList: Feedback[];
}

const FeedbackSection = ({
  initialFeedbackList,
}: Props): React.ReactElement => {
  // 전체 피드백 리스트
  // NOTE: index 0은 Input을 위한 공간이므로 빈 feedback으로 채운다.
  // NOTE: index 1부터 initialFeedbackList로 채우고, 남는 공간은 빈 feedback으로 채운다.
  const [feedbackList, setFeedbackList] = useState<Feedback[]>(() => [
    generateNewFeedback('', 0),
    ...initialFeedbackList,
    ...Array(
      Math.max(SNAIL_SIDE_LENGTH ** 2 - initialFeedbackList.length - 1, 0)
    )
      .fill(null)
      .map((_, i) => generateNewFeedback('', i + 1)),
  ]);

  // NOTE: FCP 최적화를 위해 보이지 않는 영역은 최초 렌더링 이후 show 한다.
  const [showClones, setShowClones] = useState(false);
  useEffect(() => {
    setShowClones(true);
  }, []);

  // 새로운 피드백
  const [
    newFeedbackContent,
    onChangeNewFeedbackContent,
    setNewFeedbackContent,
  ] = useInput('', MAX_CONTENT_LENGTH);

  return (
    <>
      <FeedbackBoardContainer showClones={showClones}>
        <>
          <FourFakeFeedbackBoards
            feedbackList={feedbackList}
            showClones={showClones}
          />
          <FeedbackBoard
            feedbackList={feedbackList}
            newFeedbackContent={newFeedbackContent}
            onChangeNewFeedbackContent={onChangeNewFeedbackContent}
          />
          <FourFakeFeedbackBoards
            feedbackList={feedbackList}
            showClones={showClones}
          />
        </>
      </FeedbackBoardContainer>
      <FeedbackSubmitButton
        newFeedbackContent={newFeedbackContent}
        setFeedbackList={setFeedbackList}
        setNewFeedbackContent={setNewFeedbackContent}
      />
    </>
  );
};

export default FeedbackSection;

interface FakeFeedbackBoardProps {
  feedbackList: Feedback[];
  showClones: boolean;
}

// 무한한 Board 공간을 구현하기 위한 Fake Component
const FourFakeFeedbackBoards = ({
  feedbackList,
  showClones,
}: FakeFeedbackBoardProps) =>
  showClones ? (
    <>
      <FeedbackBoard feedbackList={feedbackList} />
      <FeedbackBoard feedbackList={feedbackList} />
      <FeedbackBoard feedbackList={feedbackList} />
      <FeedbackBoard feedbackList={feedbackList} />
    </>
  ) : null;
