import { createMachine, assign } from "xstate";

export const todosMachine =
	/** @xstate-layout N4IgpgJg5mDOIC5QBcD2FUFkCGBjAFgJYB2YAdADKrYQlQAEAKuqrAMQalkkBuqA1uTQYcBEuSo06TFrAS9UubMkKpiAbQAMAXUSgADq0Iq1ekAA9EARgDsAZjIBOAEx27zqwDZHmzwFZHK2cAGhAAT2syABY7WwAOKLi-O3tPOJsrOIBfLNDhLDwiLklaYgZmDHYwACdq1GqyfQAbZQAzeoBbMnzRIolqUvLZeWI+JRMNHTNDWGNVYjNLBABaZ08yGxtNdP9HTyiMxz9QiIQ7KOcyPz9vZzjPKz97R0ccvJZe8TIK1noSyDYAGFqmBlGB6KQAO7TIwTRaIRJWMhWFw3B5PTzOKJWE6IZzbZFrKKaa5xOJHBLON4gHqFL4-WB-AYAgAiYCaYGQYBhszhSAsiEOZG2+zsgSiji2cRC4UQngc2ys7jsml8nhs6ps1NpYi4wNBXPoADkwJCZBgyABlfCoSHSABinXoAEliPoAK7INiO6odegkD3IegEbBlSA8uamflLOyeTTC-ZPTQvJVPGy4hB+ZPIzRWEl+dJJ-x+bUfOl6kFg42m82oK02u1leg+v2uwNsS3ugBGHWMEb5oCWNwcjjieec+KCGUeGcS8YCMSVzkcMRsUSipZE5fI+qrJrNPyt2B40h+HDU5AUgm6Zd1O8rhv3taPJ6bPxGY2U8y0un5M0jCzRog5zxjYkpJOS+IakkGZYo4ZCYsmVgSs4NjLnGG65DSt59GQu6PjWh6Wsep4sGwNR1A0zRtJ0N5bneeEPuCT5ESRb4sB+ihfmoP79vM8KZhk0RHOcY5+BOaR2Bm4lxFcK6xO48lrph7z0bhbIcio7EYOeXBXkIOFfBpnKkRgnHjN+Ux-rC-FAQgaxIgWxJxHYAT4oEGoZqsmLIq5rnLo8LnqnYm4FAxxlaUMOkUfUjQtMg7S+nRYXqeyJnaag5ncZMv4GDZUaDogkpIv49z2I8XiaBksE2AhNz4nG6RgbYIVYTqqWaaZqD0AAorU9QApa+hgJA9DuvofEFQKCCeGkwoqpsHhZnEyZxLBBJBPsVh5j4JLbNkbWGVwEVdb1-UghAbDmLAyBgmQ2CtFy1QABTOFmmgAJRsO1RlpZFtZnZR4bWbytmFQgNjiYSLguWu6TuBmm0bH465bIkLioecORYcQ6BwGYP3FAMXXwCDAECcs5zRHDY5BFiSrJscsoILY6ypgkq2bTsoWfFwDJMjQwN5aDU1LFEUOaBc+IrWsqovBmdiyeSs2xJK4lpBOPPbpQxMZYyfVAxAk2AeDyx+EiY4XCuSqBPsmyzukyMtQ8Xhrlmnhawx+HMYRLD1raDpOm2nrGwJsbxsm655lVFznI4s6aJcHjnGhsSJ1iJaHWpXze9WB5+8Rr5Ragod2St6xR0khwrSSa3M1EPmy2h4qIk8nu4bnLEsKX4NuOsvji1sKaufbzOKWQE5gS8Hg+NO7e-Z1GU99NRzxuXKqZKVb0yqc3lIhKuaaIrC1Zmu8-HX9p0GwNRtkwOK9ihPySJxKY6Q9t60lWsQWJ74KJUlnFK4hl5LGWJDMgltlzYjFF4A46ZmaU1coSKqK0vBuEUphHIQA */
	createMachine(
		{
			context: {
				todos: [] as string[],
				errorMessage: undefined as string | undefined,
				createNewTodoFormInput: "",
			},
			tsTypes: {} as import("./todosMachine.typegen").Typegen0,
			schema: {
				events: {} as
					| { type: "Create new" }
					| { type: "Form input changed"; value: string }
					| { type: "Submit" }
					| {
							type: "Delete";
							todo: string;
					  }
					| {
							type: "Speed up";
					  },
				services: {} as {
					loadTodos: {
						data: string[];
					};
					saveTodo: {
						data: void;
					};
					deleteTodo: {
						data: void;
					};
				},
			},
			initial: "Loading Todos",
			states: {
				"Loading Todos": {
					invoke: {
						src: "loadTodos",
						onDone: [
							{
								actions: "assignTodosToContext",
								cond: "Has Todos",
								target: "Todos Loaded",
							},
							{
								target: "Create New Todo",
							},
						],
						onError: [
							{
								actions: ["assignErrorToContext"],
								target: "Loading Todos Errored",
							},
						],
					},
				},
				"Todos Loaded": {
					on: {
						"Create new": {
							target: "Create New Todo",
						},
						Delete: {
							target: "Deleting Todo",
						},
					},
				},
				"Loading Todos Errored": {},
				"Create New Todo": {
					initial: "Showing Form Input",
					states: {
						"Showing Form Input": {
							on: {
								"Form input changed": {
									actions: "assignFormInputToContext",
								},
								Submit: {
									target: "Saving Todo",
								},
							},
						},
						"Saving Todo": {
							invoke: {
								src: "saveTodo",
								onDone: [
									{
										target: "#todoMachine.Loading Todos",
									},
								],
								onError: [
									{
										actions: "assignErrorToContext",
										target: "Showing Form Input",
									},
								],
							},
						},
					},
				},
				"Deleting Todo": {
					invoke: {
						src: "deleteTodo",
						onDone: [
							{
								target: "Loading Todos",
							},
						],
						onError: [
							{
								actions: "assignErrorToContext",
								target: "Deleting Todo Errored",
							},
						],
					},
				},
				"Deleting Todo Errored": {
					after: {
						"2500": {
							target: "Todos Loaded",
						},
					},
					on: {
						"Speed up": {
							target: "Todos Loaded",
						},
					},
				},
			},
			id: "todoMachine",
		},
		{
			guards: {
				"Has Todos": (context, event) => {
					// context may have incorrect value at this time
					return event.data.length > 0;
				},
			},
			// actions are used to perform tasks that are synchronous or takes 0 time
			actions: {
				assignTodosToContext: assign((context, event) => {
					return {
						// we need to always return partial of context to update specific
						todos: event.data,
					};
				}),

				assignErrorToContext: assign((context, event) => {
					return {
						errorMessage: (event.data as Error).message,
					};
				}),

				assignFormInputToContext: assign((context, event) => {
					return {
						createNewTodoFormInput: event.value,
					};
				}),
			},
		}
	);
