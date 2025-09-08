"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Props {
    onOpen: boolean;
    // onClose: () => void;
}

export default function PendingButtton({ onOpen }: Props) {
    return (
        <Dialog open={onOpen}>
            <DialogContent className="bg-black/80 text-white lg:p-20">
                <DialogHeader className="lg:mb-10">
                    <DialogTitle>İşlem Devam Ediyor</DialogTitle>
                </DialogHeader>
                <div className="flex gap-5">
                    <p>Lütfen bekleyiniz...</p>
                    <svg className="me-3 size-5 animate-ping fill-indigo-500" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10" />
                    </svg>
                </div>
                <DialogFooter className="lg:mt-10">
                    <p>İşlem bitince form kapatılıp mülakat sayfasına yönlendirilecektir.</p>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
