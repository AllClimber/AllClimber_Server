import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    getDocs,
    setDoc,
    addDoc,
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

const getCollections = async (context: Context, collectionName: string, subCollectionName: string = undefined) => {
    try {
        const mainCollectionSnapshot = await getDocs(collection(db, collectionName));
        const dataList = await Promise.all(mainCollectionSnapshot.docs.map(async (doc) => {
            const data = doc.data();
            const subCollectionRef = collection(db, `${collectionName}/${doc.id}/${subCollectionName}`);
            const subCollectionSnapshot = await getDocs(subCollectionRef);
            
            // 서브 컬렉션의 문서들을 배열로 변환
            const subCollectionData = subCollectionSnapshot.docs.map(subDoc => subDoc.data());
            
            // 메인 데이터에 서브 컬렉션 데이터 추가
            if (subCollectionName) {
                return { ...data, [subCollectionName]: subCollectionData };
            } 
            else {
                return { ...data };
            }
        }));

        context.response.body = dataList;
        context.response.type = "json";
    } catch (error) {
        context.response.status = 500;
        context.response.body = { message: error.message };
    }
};


export const getRoutes = async(context: Context) => {
    await getCollections(context, 'routes'); // todo make firestore schema
}

export const getPlaces = async(context: Context) => {
    await getCollections(context, 'place'); // todo modify collection name
}

export const getUsers = async(context: Context) => {
    await getCollections(context, 'user', 'completeRoutes'); // todo modify collection name
}

export const addRoutes = async(context: Context) => {
    try {
        const body = await context.request.body().value;
        const docRef = await addDoc(collection(db, "routes"), body);
    
        context.response.status = 201;
        context.response.type = 'json';
        context.response.body = { message: 'Added document', id: docRef.id };
    } catch (error) {
        context.response.status = 500;
        context.response.body = { message: error.message };
    }
}