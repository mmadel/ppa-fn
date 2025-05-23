export interface PatientRecordImportJob{
    id:number,
    name:string,
    status:string,
    createdAt:Date,
    completedAt:Date,
    pmrbId:string,
    errorMessage:string
}