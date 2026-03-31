/**
 * Data Migration Script: ACE DESIGN STUDIOS -> FIREBASE
 * 
 * This script reads the current CMS content from index.html
 * and uploads it to a Firestore document named 'content/ace-design'.
 */

import fs from 'fs';
import path from 'path';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// LOAD YOUR CONFIG HERE
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

async function migrate() {
  if (firebaseConfig.apiKey === "YOUR_API_KEY") {
    console.error("❌ Please provide your firebaseConfig in this script first!");
    process.exit(1);
  }

  const indexPage = path.resolve(process.cwd(), 'index.html');
  console.log(`🔍 Reading ${indexPage}...`);

  try {
    const content = fs.readFileSync(indexPage, 'utf-8');
    const marker = /window\.CMS_DATA = (\{.*?\});/s;
    const match = content.match(marker);

    if (!match) {
      console.error("❌ Could not find window.CMS_DATA in index.html");
      return;
    }

    const cmsData = JSON.parse(match[1]);
    console.log("✅ Data extracted from index.html");

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    console.log("🚀 Uploading to Firestore under 'content/ace-design'...");
    await setDoc(doc(db, "content", "ace-design"), cmsData);
    
    console.log("✨ MIGRATION SUCCESSFUL!");
    console.log("Now your site is powered by Firebase!");
  } catch (err) {
    console.error("❌ Migration failed:", err);
  }
}

migrate();
