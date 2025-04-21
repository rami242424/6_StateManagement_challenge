import { useRecoilState, useRecoilValue, useSetRecoilState  } from "recoil";
import { AllCategories, categoryState, toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList(){
    // 방법1
    /* const toDos = useRecoilValue(toDoState);
    //console.log(toDos, "ToDoList 의 toDos");
    const selectorOutput = useRecoilValue(toDoSelector);
    //console.log(selectorOutput, "🔥selector output !"); */

    // 방법2
    const todoDoingDone = useRecoilValue(toDoSelector);
    const [cat, setCat] = useRecoilState(categoryState);
    const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
        //console.log(event.currentTarget.value , "뭐눌렀냐");
        setCat(event.currentTarget.value as any);
    };
    //console.log(cat);
    console.log(todoDoingDone, "todoDoingDone");
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

          
            {/* 방법1
            {cat === "TO_DO" && 
                todos.map((todo) => <ToDo key={todo.id} {...todo}/>)}
            {cat === "DOING" && doings.map((doing) => <ToDo key={doing.id} {...doing}/>)}
            {cat === "DONE" && dones.map((done) => <ToDo key={done.id} {...done}/>)} */}

            {/* 방법2 */}
            {todoDoingDone?.map((atodoDoingDone) => <ToDo key={atodoDoingDone.id} {...atodoDoingDone} />)}

        </div>
    );
}

export default ToDoList;


