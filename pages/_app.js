import { useEffect } from "react";
import '../styles/globals.css'
import  { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import Loading from "../component/Loading";
import Login from "./Login";
import { DataLayer } from "../config/DataLayer";
import  reducer , { initialState } from "../config/Reducer";
import firebase from 'firebase';

function MyApp({ Component, pageProps }) {
  const [user,loading] = useAuthState(auth);

  useEffect(() => {
    if(user){
      db.collection('user').doc(user.uid).set({
        email : user.email,
        name : user.displayName,
        lastSeen : firebase.firestore.FieldValue.serverTimestamp(),
        photoURL : user.photoURL,
      },{
        merge : true,
      })
    }
  }, [user]);
  
  if(loading){
    return <Loading />
  }
  if(!user){
    return <Login />
  }

  return( 
    <DataLayer initialState={initialState} reducer={reducer} >
      <Component {...pageProps} />
    </DataLayer>
  )
}


export default MyApp
