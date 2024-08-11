import { person } from "./person"

export interface freeCertificate
{
   id: number
  number: number
  certified: boolean
  dueDate?: Date
  issuanceDate?: Date
  chID: number
  peID: number
  per?: person
}