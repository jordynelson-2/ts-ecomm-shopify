import {ReactNode} from 'react'

export type childrenProps{
    children: ReactNode
}

export interface ModalProps {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
  }

 export interface Step {
    title: string;
    description: string;
  }

export interface StepsSequenceProps {
    steps: Step[];
  }



