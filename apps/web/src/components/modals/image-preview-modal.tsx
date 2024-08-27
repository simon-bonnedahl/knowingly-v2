"use client"
import { cn } from "@knowingly/ui"
import { Modal, ModalContent, ModalTrigger } from "@knowingly/ui/modal"
import Image from "next/image"

interface ImagePreviewModalProps {
    image: string
    className?: string
}


export const ImagePreviewModal = ({image, className} : ImagePreviewModalProps) => {


    return (
        <Modal>
            <ModalTrigger asChild>
                <Image src={image} width={100} height={100} alt="image-with-preview"  className={cn(className, "hover:cursor-pointer")}/>
            </ModalTrigger>
            <ModalContent>
                <Image src={image} width={600} height={200} alt="image-preview" className="w-full h-full rounded-md" />
            </ModalContent>
        </Modal>
    )
}