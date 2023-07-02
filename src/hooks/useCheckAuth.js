import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { useEffect } from "react";
import { startLoadingNotes } from "../store/journal";


export const useCheckAuth = () => {
    const dispatch = useDispatch();
    const { status } = useSelector(state => state.auth);

    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (!user) return dispatch(logout())
            const { uid, email, displayName, photoURL } = user;
            dispatch(login({ uid, email, displayName, photoURL }))
            dispatch(startLoadingNotes())
        })

    }, [])

    return status;
}