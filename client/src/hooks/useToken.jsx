import { useEffect, useState } from 'react';

const useToken = () => {
    const [token, setToken] = useState(() => {
        // İlk başta localStorage'dan token'ı çekiyoruz
        return JSON.parse(localStorage.getItem("auth")) || "";
    });

    useEffect(() => {
        // localStorage değiştiğinde token'ı güncelle
        const handleStorageChange = () => {
            setToken(JSON.parse(localStorage.getItem("auth")) || "");
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return [token, setToken];
};

export default useToken;
