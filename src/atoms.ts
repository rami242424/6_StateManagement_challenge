import { atom, selector } from "recoil";

export enum AllCategories {
    "TO_DO" =  "TO_DO",
    "DOING" = "DOING" ,
    "DONE" = "DONE"
}

export interface IToDo {
    text : string;
    id : number;
    category : AllCategories;
}

export const categoryState = atom<AllCategories>({
    key: "category",
    default: AllCategories.TO_DO,
})

export const toDoState = atom<IToDo[]>({
    key: "TODO",
    default: [],
})

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({get}) => {
        const toDoss = get(toDoState);
        const catss = get(categoryState);
        return toDoss.filter((list) => list.category === catss);
    }
})