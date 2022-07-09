//libs
import { useMachine } from "@xstate/react";

//machines
import { myMachine } from "../machines/myFirstMachine";

//types
import type { NextPage } from "next";

const FirstMachine: NextPage = () => {
	const [state, send] = useMachine(myMachine);

	return (
		<div>
			<h1>First Machine</h1>
			{JSON.stringify(state.value)}

			<button onClick={() => send("MOUSEOVER")}>Mouse Over</button>
			<button onClick={() => send("MOUSEOUT")}>Mouse Out</button>
		</div>
	);
};

export default FirstMachine;
