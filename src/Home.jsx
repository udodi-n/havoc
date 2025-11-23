import { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, collection, getDocs, query, where, addDoc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";


const Home = () => {
    const navigate = useNavigate();
    const currentUser = auth.currentUser;
    const [posts, setPosts] = useState([])
    const [checkmark, setCheckmark] = useState(false)
    

    useEffect(() => {        
        const updateHome = onSnapshot(collection(db, "posts"), (snapshot) => { 
            const postArray = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data()}))   
            .sort((a, b) => b.createdAt - a.createdAt);

            setPosts(postArray);
           
        });

        return () => updateHome()

}, [])

        useEffect(() => {
        const unsub = auth.onAuthStateChanged(user => {
            if (!user) return;
            checkAdmin();
        });

        return () => unsub();
        }, []);


     const checkAdmin =  async () => {
            const userRef = collection(db, "users")
            const q = query(userRef, where("isAdmin", "==", true));
            const snap = await getDocs(q)

            const admins = snap.docs.map(docSnap => docSnap.data().username)

           

            const postRef = collection(db, "posts")
            const postSnap = await getDocs(postRef)

            postSnap.forEach(async (docSnap) => {
                const postData = docSnap.data()
                const postUsername = postData.username;

                const postDocRef = doc(db, "posts", docSnap.id)

                if (admins.includes(postUsername) && !postData.isAdmin) {
                await setDoc(postDocRef, {isAdmin: true}, {merge: true})
            } else if (postData.isAdmin && !admins.includes(postData.username)) {
                await setDoc(postDocRef, {isAdmin: false}, {merge: true})
            }
            })
} 

// const deleteInfo = async () => {
//     const cred = await signInAnonymously(auth);
//     const user = cred.user
//     await deleteDoc(doc(db, "users", user.uid))
// }



    // useEffect(() => {
    //     const textLimiter = () => {
    //         const result = []
    //         for (let i=0; i<150; i++) {
    //             if (message.length === 150) {
    //                 const messageArray = message.split(' ')
    //                 result.push(messageArray[i])
    //             }
    //         }
    //         setMessage( result.join(' '))
    //         return result.join(' ')
    //     }
    //     console.log(textLimiter())
    // }, [message])


    

    return <div className="relative bg-[#1c1c1c] min-h-screen h-fit w-full flex flex-col items-center">


{/* Main Container ^ */}

{/* Header Start  */}
        <div className="fixed top-0 bg-[#1c1c1c] h-20 w-full border-b-1 border-white/20 flex justify-center items-center py-4">
            <h1 className="text-white font-[Ponderosa] text-3xl">HAVOC</h1>
        </div>

        {/* Header End */}

        {/* Posts start */}
  <div className="flex flex-col w-full px-4 items-center
                mt-20
                max-h-[calc(100vh-5rem)] 
                overflow-y-auto">
    {posts.map(post => (
        <div key={post.id} className="border-t border-b border-white/10 p-4 text-white w-full max-w-2xl">
            <p className="font-bold flex gap-1">@{post.username}<img className={`${post.isAdmin? 'w-[5%]': 'hidden '}`} src="/badge-check.svg"/> </p>
            <p>{post.post}</p>
        </div>
    ))}
</div>


                    {/* Posts End */}

                {/* Post button start */}

        <div 
        onClick={() => {
            console.log('clicked'); navigate('/post')
        }}
        className="fixed bottom-20 right-10 h-20 w-20 bg-white text-black rounded-full flex justify-center items-center text-5xl">
            + 
        </div>

        {/* Post button end */}

        {/* Post Entry Start */}

        
        {/* Post Entry Stop */}

        {/* <button
        onClick = {() => {localStorage.clear(); deleteInfo(); console.log("storage cleared")}}
        className="z-10 absolute px-4 h-16 w-w0 top-10 bg-red-900">clear storage</button> */}

 
    </div>
}

export default Home