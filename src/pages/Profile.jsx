import { collection, doc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { app } from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { getAuth } from "firebase/auth";
import Form from 'react-bootstrap/Form';
import toast, { Toaster } from "react-hot-toast";
import { ProgressBar } from "react-bootstrap";


function Profile({setProfile, profile}) {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [user, setUser] = useState(null);
    // const [profileImage, setProfileImage] = useState(''); // Initialize state for profile image URL
    const db = getFirestore(app);
    const storage = getStorage(app);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
            }
        });
        return () => unsubscribe();
    }, [auth]);

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            toast.error("Please select an image...");
            return;
        }

        if (!user) {
            toast.error("User not authenticated.");
            return;
        }

        setUploading(true);

        const storageRef = ref(storage, "profile/" + Math.random() + file.name);
        const uploadTask = uploadBytesResumable(storageRef,file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;                setProgress(progress);
            },
            (error) => {
                toast.error("Upload failed. Please try again.");
                setUploading(false);
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    await updateProfileImage(downloadURL);
                } catch (error) {
                    toast.error("Failed to update profile image. Please try again.");
                } finally {
                    setUploading(false);
                }
            }
        );
    };

    const updateProfileImage = async (downloadURL) => {
        try {
            const usersRef = collection(db, "users");
            const queryDocument = query(usersRef, where("userId", "==", user.uid));
            const querySnapshot = await getDocs(queryDocument);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const userDocRef = doc(db, "users", userDoc.id);

                await updateDoc(userDocRef, {
                    profileImage: downloadURL,
                });

                toast.success("Profile image updated successfully!");
                setProfile(downloadURL); // Update profile image URL state
            } else {
                toast.error("User document not found.");
            }
        } catch (error) {
            toast.error("Error querying user document. Please try again.");
        }
    };

    return (
        <div className="profile-page">
            <Form.Control
                type="file"
                id="profileImage"
                onChange={handleUpload}
                disabled={uploading}
            />
            {uploading && <ProgressBar striped now={progress} label={`${progress}%`}></ProgressBar>}
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
}

export default Profile;
