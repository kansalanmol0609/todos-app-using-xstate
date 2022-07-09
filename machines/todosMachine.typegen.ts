// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    assignTodosToContext: "done.invoke.todoMachine.Loading Todos:invocation[0]";
    assignErrorToContext:
      | "error.platform.todoMachine.Loading Todos:invocation[0]"
      | "error.platform.todoMachine.Create New Todo.Saving Todo:invocation[0]"
      | "error.platform.todoMachine.Deleting Todo:invocation[0]";
    assignFormInputToContext: "Form input changed";
  };
  internalEvents: {
    "done.invoke.todoMachine.Loading Todos:invocation[0]": {
      type: "done.invoke.todoMachine.Loading Todos:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.todoMachine.Loading Todos:invocation[0]": {
      type: "error.platform.todoMachine.Loading Todos:invocation[0]";
      data: unknown;
    };
    "error.platform.todoMachine.Create New Todo.Saving Todo:invocation[0]": {
      type: "error.platform.todoMachine.Create New Todo.Saving Todo:invocation[0]";
      data: unknown;
    };
    "error.platform.todoMachine.Deleting Todo:invocation[0]": {
      type: "error.platform.todoMachine.Deleting Todo:invocation[0]";
      data: unknown;
    };
    "done.invoke.todoMachine.Create New Todo.Saving Todo:invocation[0]": {
      type: "done.invoke.todoMachine.Create New Todo.Saving Todo:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.todoMachine.Deleting Todo:invocation[0]": {
      type: "done.invoke.todoMachine.Deleting Todo:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    loadTodos: "done.invoke.todoMachine.Loading Todos:invocation[0]";
    saveTodo: "done.invoke.todoMachine.Create New Todo.Saving Todo:invocation[0]";
    deleteTodo: "done.invoke.todoMachine.Deleting Todo:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: "loadTodos" | "deleteTodo" | "saveTodo";
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    loadTodos:
      | "done.invoke.todoMachine.Create New Todo.Saving Todo:invocation[0]"
      | "done.invoke.todoMachine.Deleting Todo:invocation[0]";
    deleteTodo: "Delete";
    saveTodo: "Submit";
  };
  eventsCausingGuards: {
    "Has Todos": "done.invoke.todoMachine.Loading Todos:invocation[0]";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "Loading Todos"
    | "Todos Loaded"
    | "Loading Todos Errored"
    | "Create New Todo"
    | "Create New Todo.Showing Form Input"
    | "Create New Todo.Saving Todo"
    | "Deleting Todo"
    | "Deleting Todo Errored"
    | { "Create New Todo"?: "Showing Form Input" | "Saving Todo" };
  tags: never;
}
