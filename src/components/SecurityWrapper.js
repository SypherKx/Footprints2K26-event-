"use client";

import { useEffect } from "react";

export default function SecurityWrapper({ children }) {
    useEffect(() => {
        // Skip security features in development
        if (process.env.NODE_ENV === 'development') {
            return;
        }

        const handleContextMenu = (e) => e.preventDefault();

        const handleKeyDown = (e) => {
            if (e.keyCode === 123) {
                e.preventDefault();
                return false;
            }

            if (e.ctrlKey && (e.shiftKey ? (e.keyCode === 73 || e.keyCode === 74) : e.keyCode === 85)) {
                e.preventDefault();
                return false;
            }

            if (e.ctrlKey && e.keyCode === 83) {
                e.preventDefault();
                return false;
            }
        };
        const showWarning = () => {
            console.clear();
            // console.log(
                "%c⚠️WARNING⚠️!",
                "color: red; font-size: 50px; font-weight: bold;",
            )
            // console.log(
                "%cThis is a browser feature intended for Ignitia developers. If someone told you to copy-paste something here to enable a free feature or 'hack' someone's account, it is a scam and your Ignitia Account may be compromised.",
                "font-size: 18px;",
            )
        };

        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("keydown", handleKeyDown);
        showWarning();

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return <>{children}</>;
}
