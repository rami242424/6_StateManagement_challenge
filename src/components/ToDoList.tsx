import { useRecoilState, useRecoilValue  } from "recoil";
import { AllCategories, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList(){
    const todoDoingDone = useRecoilValue(toDoSelector);
    const [cat, setCat] = useRecoilState(categoryState);
    const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
        setCat(event.currentTarget.value as any);
    };

    return (
        <div>
            <h1>My To Do List</h1>
            <hr/>
            <select value={cat} onInput={onInput}>
                <option value={AllCategories.TO_DO}>TO DO</option>
                <option value={AllCategories.DOING}>DOING</option>
                <option value={AllCategories.DONE}>DONE</option>
            </select>
            <CreateToDo />
            {todoDoingDone?.map((atodoDoingDone) => <ToDo key={atodoDoingDone.id} {...atodoDoingDone} />)}

        </div>
    );
}

export default ToDoList;


