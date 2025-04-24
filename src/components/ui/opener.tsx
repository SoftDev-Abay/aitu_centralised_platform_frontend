import { ReactNode } from "react"
import useBoolean from "@/hooks/useBoolean"

interface RenderParams {
  isOpen: boolean
  open: () => void
  close: () => void
}

interface OpenerProps {
  renderTrigger: (p: RenderParams) => ReactNode
  renderModal: (p: RenderParams) => ReactNode
}

export function Opener({ renderTrigger, renderModal }: OpenerProps) {
  const [isOpen, { setTrue: open, setFalse: close }] = useBoolean(false)

  const params = { isOpen, open, close }

  return (
    <>
      {renderTrigger(params)}
      {isOpen && renderModal(params)}
    </>
  )
}
