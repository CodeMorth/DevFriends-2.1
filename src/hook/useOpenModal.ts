import { useState } from "react"

export function useOpenModal  () {
    const [open, setopen] = useState<boolean>(false)
    const closeModal = () => {
        setopen(false)
    }
    const openModal = () => {
        setopen(true)
    }

 

    return { open , setopen , closeModal , openModal , }
}

