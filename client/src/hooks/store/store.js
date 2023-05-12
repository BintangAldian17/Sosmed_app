import { persist } from "zustand/middleware"
import { create } from "zustand"

export const useAuth = create(
    persist(
        (set) => ({
            currentUser: JSON.parse(localStorage.getItem("auth-storage")) || null,
            setCurrentUser: (user) => {
                localStorage.setItem("auth-storage", JSON.stringify(user));
                return { currentUser: user }
            }
        }),
        {
            name: "auth-storage"
        }
    )
)