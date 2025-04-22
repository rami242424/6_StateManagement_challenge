import { atom, selector } from "recoil";

export enum AllCategories {
    "TO_DO" =  "TO_DO",
    "DOING" = "DOING" ,
    "DONE" = "DONE",
}

// enum + "" 타입 확장
export type categotyType = AllCategories | "" | "newCategory";

export interface IToDo {
    text : string;
    id : number;
    category : AllCategories;
}

export const categoryState = atom<categotyType>({
    key: "category",
    default: "",
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
        if (catss === "") return []; // 카테고리 선택 x , 빈배열 반환환
        return toDoss.filter((list) => list.category === catss);
    }
})