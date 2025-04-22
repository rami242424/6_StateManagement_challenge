import { atom, selector } from "recoil";
import {recoilPersist} from "recoil-persist";


// localStorage 연결
const { persistAtom } = recoilPersist();

export enum allCategories {
    "TO_DO" =  "TO_DO",
    "DOING" = "DOING" ,
    "DONE" = "DONE",
}

// enum + "" 타입 확장
export type categotyType = allCategories | "" | "newCategory";

export interface IToDo {
    text : string;
    id : number;
    category : allCategories;
}


// 1. 할 일 목록 상태: localStorage 저장
export const toDoState = atom<IToDo[]>({
    key: "TODO",
    default: [],
    effects_UNSTABLE: [persistAtom],
});


// 2. 선택된 카테고리 상태: localStorage 저장
export const categoryState = atom<categotyType>({
    key: "category",
    default: "",
    effects_UNSTABLE: [persistAtom],
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