import inquirer from "inquirer";

export async function runPrompts() {
  const questions = [
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      default: "my-app",
      validate: (input) => input.length > 0 || "Project name cannot be empty"
    },
    {
      type: "confirm",
      name: "useTailwind",
      message: "Add Tailwind CSS?",
      default: true
    },
    {
      type: "confirm",
      name: "useShadcn",
      message: "Add ShadCN UI components?",
      default: true
    },
    {
      type: "confirm",
      name: "useConvex",
      message: "Include Convex setup?",
      default: true
    },
    {
      type: "confirm",
      name: "useClerk",
      message: "Include Clerk Auth + Webhook?",
      default: true
    },
    {
      type: "confirm",
      name: "useDodo",
      message: "Include DodoPayments integration?",
      default: true
    },
    {
      type: "confirm",
      name: "installDeps",
      message: "Install dependencies?",
      default: true
    }
  ];

  const answers = await inquirer.prompt(questions);
  return answers;
}

// This file will take all the required choices
// inquirer is industry standard 