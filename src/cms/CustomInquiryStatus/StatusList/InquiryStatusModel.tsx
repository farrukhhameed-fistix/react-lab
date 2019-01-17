export class InquiryStatusModel{
    id: number = 1;
    title: string = "";
    description: string = "";
    color: string = "";
    orderIndex: number | undefined

    constructor(id: number, title: string, color: string){
        this.id = id;
        this.title = title;
        this.color = color;
    }
}