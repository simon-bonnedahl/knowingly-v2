import { create } from 'zustand'

type BannerStore = {
  url?: string
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onReplace: (url: string) => void
}

export const useBanner = create<BannerStore>((set) => ({
  url: undefined,
  isOpen: false,
  onOpen: () => set({ isOpen: true, url: undefined }),
  onClose: () => set({ isOpen: false, url: undefined }),
  onReplace: (url: string) => set({ isOpen: true, url })
}))