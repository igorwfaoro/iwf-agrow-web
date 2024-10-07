import { Firestore } from '@google-cloud/firestore';
import { initialize } from 'fireorm';

let firestore: Firestore | null = null;

export const initFirestore = () => {
  if (!firestore) {
    firestore = new Firestore({
      projectId: process.env.FIREBASE_PROJECT_ID,
      credentials: {
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        private_key:
          process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || ''
      }
    });

    initialize(firestore);
  }

  return firestore;
};
