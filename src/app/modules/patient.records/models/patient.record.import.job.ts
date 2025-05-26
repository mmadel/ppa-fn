export interface PatientRecordImportJob{
    id:number,
    username:string,
    status:string,
    createdAt:Date,
    updatedAt:Date,
    requestId:string,
    errorMessage:string
}