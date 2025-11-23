import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { collection, addDoc, query, getDocs, where } from 'firebase/firestore'

const Post = () => {
      const navigate = useNavigate();
      const username = localStorage.getItem('username');
      const [postLength, setPostLength] = useState(0);
      const [message, setMessage] = useState("");
      const [disable, setDisable] = useState(false)
      const [admin, setAdmin] = useState(false)
      const currentUser = auth.currentUser;


      const handlePost = async () => {
            const userRef = collection(db, "users")
            const q = query(userRef, where("isAdmin", "==", true));
            const snap = await getDocs(q)

            const admins = snap.docs.map(docSnap => docSnap.data().username);
            const isAdmin = admins.includes(username)
            console.log(admins)
            
            const user = auth.currentUser;
            if(!user) return;


        await addDoc(collection(db, "posts"), {
            userId: currentUser.uid,
            username: username,
            post: message,
            isAdmin: isAdmin,
            createdAt: Date.now()
    })
};

useEffect(() => {
       if (postLength === 0) {
        setDisable(true)
    } else {
        setDisable(false)
    }
}, [message])

    return ( 
    <div className={` absolute h-screen w-full bg-[#1c1c1c] flex flex-col justify-center items-center text-white font-[Satoshi]`}>

            {/*X button*/}
            <div 
            onClick={() => {
                navigate('/home')
            }}
            className={`absolute top-40 right-20`}
            >
                <div className="absolute h-7 rotate-45 w-1 bg-white"></div>
                <div className=" absolute h-7 rotate-135 w-1 bg-white"></div>
            </div>

            {/* X button end */}

            {/* Textarea Container Start */}

           <div className="flex flex-col w-4/5 h-4/5 justify-center items-center gap-6">

             <div className="flex w-full flex-start">@{username}</div>

                <textarea
                value={message}
                className="w-full h-1/4 border-l-1 border-b-1 rounded-md p-4 text-white text-lg outline-none resize-none"

                placeholder="What's on your mind?"

                // Set Word Limit 

                onChange = {(e) => {
                    const value = e.target.value;
                    setPostLength(value.length);

                    if (value.length <= 150) {
                        setMessage(value);
                    }
                }}
                // disabled = {setWordCount()}
                >
                </textarea>

                <div className="w-full flex justify-end"><span>{postLength}</span>/150</div>
                <div 
                className="w-full flex justify-end"><button
                onClick={() => {
                    handlePost(); console.log(currentUser); navigate('/home')
                }} 
                className={`px-8 py-1 rounded-full bg-white text-black ${disable? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>Post</button></div>
                
           </div>

        </div> )
}

export default Post;