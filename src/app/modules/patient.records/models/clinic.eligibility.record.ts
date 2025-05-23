export interface ClinicEligibilityRecord{
    id:number,
    clinicName:String,
    status:string,
    selected?: boolean;
    pmrbId?:string
    lastUpdate:Date
}