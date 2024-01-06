import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    getDocs,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-lite.js";
import { Context } from "https://deno.land/x/oak@v7.7.0/mod.ts";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// TODO 암호화하거나, 환경변수로 빼둬야 함
const firebaseConfig = {
    apiKey: "AIzaSyBD3jAbAI4q-Ai_gZqL743A0suIVFnfMv4",
    authDomain: "allclimber.firebaseapp.com",
    databaseURL: "https://allclimber-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "allclimber",
    storageBucket: "allclimber.appspot.com",
    messagingSenderId: "511248573165",
    appId: "1:511248573165:web:e8f117cf1af7465b69a2e4",
    measurementId: "G-H5LX483JRK"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firestore 인스턴스 생성
const db = getFirestore(app);

export const getRoutes = async(context: Context) => {
    const routeCol = collection(db, 'route');
    const routeSnapshot = await getDocs(routeCol);
    const routeList = routeSnapshot.docs.map(doc => doc.data());
    context.response.body = routeList;
    context.response.type = "json";
}