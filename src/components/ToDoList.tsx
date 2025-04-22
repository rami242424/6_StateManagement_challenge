import { useRecoilState, useRecoilValue  } from "recoil";
import { AllCategories, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { useState } from "react";

function ToDoList(){
    const [totalCustomCats, setTotalCustomCats] = useState<string[]>([]); // 유저가 추가한 카테고리 목록
    const [isCreatingCat, setIsCreatingCat] = useState(false);  // 새 카테고리 추가 모드
    const [newCatInput, setNewCatInput] = useState(""); // 새 카테고리 입력값

    const todoDoingDone = useRecoilValue(toDoSelector); // 현재 카테고리에 해당하는 ToDo 목록
    const [cat, setCat] = useRecoilState(categoryState); // 현재 선택된 카테고리

    // select box에서 옵션 변경 시
    const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
        //setCat(event.currentTarget.value as any);
        const value = event.currentTarget.value;
        setCat(value as any);

        if(value === "newCategory"){
            setIsCreatingCat(true);
        } else {
            setIsCreatingCat(false);
        }
    };

    // Add 버튼 눌렀을 때 실행
    const handleAddCat = () => {
        if(newCatInput.trim() === "") return; // 빈칸입력시 작동x

        setTotalCustomCats((prev) => [...prev, newCatInput]);
        setNewCatInput(""); // input 비우기
        //setCat(""); // select박스 초기값(카테고리를 선택하세요)로 리셋
        //setIsCreatingCat(false);
    }



    return (
        <div>
            <h1>My To Do List</h1>
            <hr/>
            <select value={cat} onInput={onInput}>
                <option value="" disabled>카테고리를 선택하세요.</option>
                <option value="newCategory">+ Add New Category</option>
                <option value={AllCategories.TO_DO}>TO DO</option>
                <option value={AllCategories.DOING}>DOING</option>
                <option value={AllCategories.DONE}>DONE</option>

                {
                    totalCustomCats.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))
                }

            </select>


            {isCreatingCat && (
                <div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault(); // 새로고침 방지
                            handleAddCat();     // Add 실행
                        }}
                    >
                        <input
                        type="text"
                        value={newCatInput}
                        onChange={(e) => setNewCatInput(e.target.value)}
                        placeholder="Make a new Category"
                        />
                        <button onClick={handleAddCat}>Add</button>
                    </form>


                    {/* 추가된 카테고리 + 기존 리스트 출력 */}
                    <ul>
                        {
                            [
                                ...Object.values(AllCategories),
                                ...totalCustomCats
                            ].map((cat) => (
                                <li key={cat} value={cat}>{cat}</li>
                            ))
                        }
                    </ul>
                </div>
                )}



            <CreateToDo />
            {todoDoingDone?.map((atodoDoingDone) => <ToDo key={atodoDoingDone.id} {...atodoDoingDone} />)}

        </div>
    );
}

export default ToDoList;


