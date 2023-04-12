import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from 'firebase/firestore';
import { firestore } from '../../../../Downloads/inflearn-nextjs/firebase./../../Desktop/workspace/inflearn_nextjs/firebase/index';
import type { Feedback } from '../../../../Downloads/inflearn-nextjs/types/feedback';
import { SNAIL_SIDE_LENGTH } from '../../../../Downloads/inflearn-nextjs/components/feedback/variables';

export const feedbackListCollection = collection(firestore, 'feedbackList');

export async function getFeedbackListFromFirestore(): Promise<Feedback[]> {
  const initialFeedbackList: Feedback[] = [];

  /** https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection */
  const querySnapshot = await getDocs(
    query(
      feedbackListCollection,
      orderBy('timestamp', 'desc'),
      limit(SNAIL_SIDE_LENGTH ** 2)
    )
  );
  querySnapshot.forEach((doc: any) => {
    initialFeedbackList.push(doc.data() as Feedback);
  });

  return initialFeedbackList;
}

export function addFeedbackToFirestore(newFeedback: Feedback): void {
  /** https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document */
  addDoc(feedbackListCollection, newFeedback).then();
}
