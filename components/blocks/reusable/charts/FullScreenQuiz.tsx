"use client"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Before } from "v8"

export default function FullscreenWarning({ children }: { children: React.ReactNode }) {
    const [showWarning, setShowWarning] = useState(false)

    // Automically open fullscreen
    useEffect(() => {
        const el = document.documentElement
        if (el.requestFullscreen) {
            el.requestFullscreen().catch(() => console.warn("Fullscreen açılamadı"))
        }
    }, [])

    useEffect(() => {
        const handleFullscreenChange = () => {
            // if closed fullscreen show modal
            if (!document.fullscreenElement) {
                setShowWarning(true)

                // Again fullscreen request
                document.documentElement.requestFullscreen()
            } else {
                setShowWarning(false)
            }
        }

        // Add event useEffect inside 
        document.addEventListener("fullscreenchange", handleFullscreenChange)

        return () => {
            // Remove event
            document.removeEventListener("fullscreenchange", handleFullscreenChange)
        }
    }, [])

    // Block F5 or refresh page
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = '';
            setShowWarning(true);
            return "";
        }

        window.addEventListener("beforeunload", handleBeforeUnload)

        return () => window.removeEventListener("beforeunload", handleBeforeUnload)
    })

    return (
        <>

            {children}


            <Dialog open={showWarning} onOpenChange={setShowWarning}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Dikkat!</DialogTitle>
                        <DialogDescription>
                            Tam ekrandan çıktınız! Lütfen tekrar tam ekrana geçin ve sekmede kalın.
                        </DialogDescription>
                        <button
                            onClick={() => {
                                document.documentElement.requestFullscreen()
                            }}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Tekrar Tam Ekrana Geç
                        </button>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}
