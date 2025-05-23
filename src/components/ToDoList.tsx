import { useRecoilState, useRecoilValue } from "recoil";
import { allCategories, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { useState } from "react";

function ToDoList(){
    const [NewAddCats, setNewAddCats] = useState<string[]>([]); // 유저가 추가한 카테고리 목록
    const [isCreatingCat, setIsCreatingCat] = useState(false);  // 새 카테고리 추가 모드
    const [newCatInput, setNewCatInput] = useState(""); // 새 카테고리 입력값
    const allCats = [...Object.values(allCategories), ...NewAddCats]; // 기존 카테+새 카테


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

        setNewAddCats((prev) => [...prev, newCatInput]);
        setNewCatInput(""); // input 비우기
        //setCat(""); // select박스 초기값(카테고리를 선택하세요)로 리셋
        //setIsCreatingCat(false);
    }

    // 카테고리 Delete 
    const handleDeleteCat = (catToDelete:string) => {
        setNewAddCats((prev) => prev.filter((cat) => cat !== catToDelete)); // 유저가 만든 카테고리 삭제
    }


    return (
        <div>
            <h1>My To Do List</h1>
            <hr/>
            <select value={cat} onInput={onInput}>
                <option value="" disabled>카테고리를 선택하세요.</option>
                <option value="newCategory">+ Add New Category</option>
                <option value={allCategories.TO_DO}>TO DO</option>
                <option value={allCategories.DOING}>DOING</option>
                <option value={allCategories.DONE}>DONE</option>

                {
                    NewAddCats.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))
                }

            </select>


            {/* 추가하고 보여지는 부분 */}
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
                                ...Object.values(allCategories),
                                ...NewAddCats
                            ].map((cat) => (
                                <li key={cat}>
                                    {cat}
                                    {NewAddCats.includes(cat) && (
                                        <button onClick={() => handleDeleteCat(cat)}>❌</button>
                                    )}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                )}



            <CreateToDo />
            {todoDoingDone?.map((atodoDoingDone) => 
            (
                <ToDo 
                    key={atodoDoingDone.id} 
                    {...atodoDoingDone}
                    allCategories={allCats} // ✅ 전체 카테고리를 ToDo에 전달
                />
            )
            
            )}

        </div>
    );
}

export default ToDoList;


