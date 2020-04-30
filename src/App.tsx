import React, { Fragment, useState,useRef } from 'react';

interface ITaskState {
	name: string;
	done: boolean;
}

type FormEvent = React.FormEvent<HTMLFormElement>;

function App(): JSX.Element {
    const taskInput = useRef<HTMLInputElement>(null);
	const [newTask, setnewTask] = useState<string>("");
	const [tasks, setTasks] = useState<ITaskState[]>([]);

	const handleSubmit = (e: FormEvent):void => {
		e.preventDefault();
		addTask(newTask);
		setnewTask("");
		console.log("=>", tasks);
		taskInput.current?.focus()
	}
	const addTask = (name: string):void => {
		const newTasks: ITaskState[] = [...tasks, { name, done: false }]
		setTasks(newTasks);
	}
	const toggleDoneTask=(i:number):void=>{
			const newTasks:ITaskState[]=[...tasks]
			newTasks[i].done=!newTasks[i].done;
			setTasks(newTasks);
	}
	const removeNewTask=(i:number):void=>{
			const newTasks:ITaskState[]=[...tasks];
			newTasks.splice(i,1);
			setTasks(newTasks);
	}

	return (
		<Fragment>
			<div className="container p-4">
				<div className="row">
					<div className="col-md-6 offset-md-3">
						<h1>TODO TASK TYPESCRIPT</h1>
						<div className="card">
							<div className="card-body">
								<form onSubmit={handleSubmit}>
									<input type="text"
										className="form-control"
										ref={taskInput}
										autoFocus
										onChange={(e) => setnewTask(e.target.value)} />
									<button className="btn btn-primary btn-block mt-2">Save</button>
								</form>
							</div>
						</div>
						{
							tasks.map((task: ITaskState, i: number) => {
								return (
									<div key={i} className="card">
										<div  className="card-body mt-2">
											<h3 style={{textDecoration:task.done? "line-through" :""}}>{task.name}</h3>
										</div>
									     <div  className="card-body">
											 <button className={(task.done)?"btn btn-secondary btn-block":"btn btn-success btn-block"} onClick={()=>toggleDoneTask(i)}>
											 	{(task.done)?"tarea por hacer":"tarea efectuada"}
										 </button>
										 <button className="btn btn-danger btn-block" onClick={()=>removeNewTask(i)}>
											 	delete
										 </button>
										 </div>
									</div>
								)
							})
						}
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default App;
