import { useEffect, useState } from "react";

export default function OfflineBanner() {

    const [offline, setOffline] = useState(!navigator.onLine);

    useEffect(() => {

        window.addEventListener("offline", () => setOffline(true));
        window.addEventListener("online", () => setOffline(false));

    }, []);

    if (!offline) return null;

    return (
        <div className="alert alert-danger text-center">
            You are offline
        </div>
    );
}