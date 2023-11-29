import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog"
import { UploadImages } from "../upload-image/upload-image"

export const UploadBtn = () => {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Upload</Button>
                </DialogTrigger>
                <DialogContent >
                    <UploadImages />
                </DialogContent>
            </Dialog>
        </>
    )
}

