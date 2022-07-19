import { Person } from "./person";

export class Description{
   constructor(
       public content: string = '',
       public file: string = '',
       public personId: number = 0
   ){} 
}