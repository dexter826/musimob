import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore'

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID
const appId = import.meta.env.VITE_FIREBASE_APP_ID

if (!apiKey || !authDomain || !projectId || !appId) {
  throw new Error(
    'Thiếu cấu hình Firebase. Kiểm tra các biến VITE_FIREBASE_* trong file .env.',
  )
}

const firebaseApp = initializeApp({
  apiKey,
  authDomain,
  projectId,
  appId,
})

export const firebaseAuth = getAuth(firebaseApp)

export const firebaseFirestore = initializeFirestore(firebaseApp, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
})
