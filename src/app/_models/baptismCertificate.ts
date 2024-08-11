import { person } from "./person"

export interface baptismCertificate
{
    id: number
    number: number
    baptismPlace: string
    baptismDate?: Date
    baptizingPriestName: string
    issuanceDate?: Date
    certified:boolean
    chID: number
    peID: number
    per?: person
    godFatherName:string
   godMotherName:string
    nameInChurch:string

}
