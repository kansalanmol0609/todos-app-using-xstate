//libs
import { useMachine } from "@xstate/react";

//machines
import { todosMachine } from "../machines/todosMachine";

//types
import type { NextPage } from "next";

// const todos = new Set<string>(["Take bins out", "Do laundry"]);
const todos = new Set<string>([]);

const Home: NextPage = () => {
	const [state, send] = useMachine(todosMachine, {
		services: {
			loadTodos: async () => {
				// throw new Error("Oh noo");
				return Array.from(todos);
			},

			saveTodo: async (context, event) => {
				todos.add(context.createNewTodoFormInput);
			},

			deleteTodo: async (context, event) => {
				// throw new Error("Oh noo");
				todos.delete(event.todo);
			},
		},
	});

	return (
		<div>
			<h1>Todos</h1>

			<pre>{JSON.stringify(state.value)}</pre>
			<pre>{JSON.stringify(state.context)}</pre>

			<div>
				{state.matches("Todos Loaded") && (
					<>
						{state.context.todos.map((todo) => (
							<div
								key={todo}
								style={{
									display: "flex",
									alignItems: "center",
								}}
							>
								<p>{todo}</p>
								<button
									onClick={() => {
										send({
											type: "Delete",
											todo,
										});
									}}
								>
									Delete
								</button>
							</div>
						))}
					</>
				)}

				{state.matches("Deleting Todo Errored") && (
					<div>
						<p>Something Went Wrong!: {state.context.errorMessage} </p>
						<button onClick={() => send("Speed up")}>Go Back to List</button>
					</div>
				)}

				{state.matches("Todos Loaded") && (
					<button onClick={() => send("Create new")}>Create new</button>
				)}

				{state.matches("Create New Todo.Showing Form Input") && (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							send({
								type: "Submit",
							});
						}}
					>
						<input
							onChange={(e) => {
								send({
									type: "Form input changed",
									value: e.target.value,
								});
							}}
						/>
					</form>
				)}
			</div>
		</div>
	);
};

export default Home;
