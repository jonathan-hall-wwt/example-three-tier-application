import { getTasks, createTask, toggleTask, deleteTask } from './actions';

export default async function Home() {
  const tasks = await getTasks();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 py-16 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
          To-Do List
        </h1>

        {/* Add task form */}
        <form action={createTask} className="flex gap-2 mb-8">
          <input
            name="title"
            type="text"
            required
            placeholder="Add a new task..."
            className="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-4 py-2 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500"
          />
          <button
            type="submit"
            className="rounded-lg bg-zinc-900 dark:bg-zinc-50 px-5 py-2 font-medium text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
          >
            Add
          </button>
        </form>

        {/* Task list */}
        <ul className="space-y-2">
          {tasks.length === 0 && (
            <li className="text-zinc-400 text-center py-8">No tasks yet. Add one above!</li>
          )}
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3"
            >
              <form
                action={async () => {
                  'use server';
                  await toggleTask(task.id, !task.completed);
                }}
              >
                <button
                  type="submit"
                  className={`h-5 w-5 rounded border-2 flex-shrink-0 transition-colors ${
                    task.completed
                      ? 'bg-zinc-900 dark:bg-zinc-50 border-zinc-900 dark:border-zinc-50'
                      : 'border-zinc-300 dark:border-zinc-600 hover:border-zinc-500'
                  }`}
                  aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
                >
                  {task.completed && (
                    <svg viewBox="0 0 12 12" className="text-white dark:text-zinc-900 w-full h-full p-0.5">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </form>
              <span
                className={`flex-1 text-sm ${
                  task.completed
                    ? 'line-through text-zinc-400'
                    : 'text-zinc-800 dark:text-zinc-100'
                }`}
              >
                {task.title}
              </span>
              <form
                action={async () => {
                  'use server';
                  await deleteTask(task.id);
                }}
              >
                <button
                  type="submit"
                  className="text-zinc-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1"
                  aria-label="Delete task"
                >
                  <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                </button>
              </form>
            </li>
          ))}
        </ul>

        {tasks.length > 0 && (
          <p className="mt-4 text-xs text-zinc-400 text-right">
            {tasks.filter((t) => t.completed).length} / {tasks.length} completed
          </p>
        )}
      </div>
    </div>
  );
}
