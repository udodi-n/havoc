import { db, auth } from "./firebase";
import { doc, setDoc, collection, getDocs, query, where, addDoc, deleteDoc } from 'firebase/firestore'
import { getAuth, signInAnonymously } from "firebase/auth";

import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';

const Username = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const shouldDisable = !username || message.includes("❌");
    const userRef = collection(db, "users");

        
    const saveUsername = async () => {

      const cred = await signInAnonymously(auth);
      const user = cred.user

        localStorage.setItem('username', username)
        console.log(localStorage.getItem('username'))
        localStorage.setItem('user', user.uid)
        await setDoc(doc(db, "users", user.uid), {
            username: username
        })
    }

    useEffect(() => { 
        const Username = async () => {
            
            const q = query(userRef, where("username", "==", username));
            const snap = await getDocs(q)

            if (!snap.empty) {
                setMessage("Username is taken ❌");
            } 
            else if (username.length === 0) {
                setMessage("");
            }
             else if (username.length > 14) {
                setMessage("Username is too long ❌");
            } else if (username.length < 3) {
                setMessage("Username is too short ❌");
            }
            else {
                setMessage("Username is available ✔");
            }
        }

        Username()
    }, [username])

    return <div className="flex justify-center text-white font-[Satoshi] h-screen bg-[#1c1c1c] w-full">

        <div className="w-full h-full flex flex-col justify-center items-center gap-6 text-center">

            <h3 className="text-4xl">Pick a username <br /> <span className="text-base text-white/70">*Don't use your real name</span></h3>
            <div className="w-full flex flex-col justify-center items-center gap-4">

                <input className="border border-1 border-white w-3/5 px-3 py-3 rounded-full focus:outline-none" type="text" placeholder="Username" 
                value = {username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().trim().replace(/[^a-zA-Z0-9_ ]/g, ""))}
                />
                <div className="text-sm text-white/80">{message}</div>

                </div>
        </div>

        <button
        disabled={shouldDisable}
        onClick={() => {navigate('/'); saveUsername()}}
        className={`absolute bottom-10 h-18 w-18 bg-white rounded-full text-black text-4xl ${shouldDisable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
            →
        </button>

        <button
        onClick = {async () => {localStorage.clear(); await deleteDoc(doc(db, "users", user.uid)); console.log("storage cleared")}}
        className="absolute px-4 h-16 w-w0 top-10 bg-red-900">clear storage</button>
    </div>
}

export default Username