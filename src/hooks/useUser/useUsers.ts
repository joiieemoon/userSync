    import React from 'react'
    import { useEffect, useState } from 'react'
    import { db } from "../../components/firebase/firebase"
    import { collection, getDocs } from "firebase/firestore";
    const useUsers = () => {
        const [users, setUsers] = useState([]);
        const [loading, setloading] = useState(true);
        
        
        useEffect(() => {
            const fetchUsers = async () => {
                const snap = await getDocs(collection(db, "Users"));
                const List = snap.docs.map((doc) =>({
                    uid: doc.id,    
                        ...doc.data(),
                    }))
        setUsers(List);
        setloading(false);

    };
    
    fetchUsers();
        }, []);


    return { users, loading }
    }

    export default useUsers
