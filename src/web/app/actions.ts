'use server';

import { revalidatePath } from 'next/cache';

const API_URL = process.env.API_URL || 'http://localhost:3001';

export type Task = {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
};

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(`${API_URL}/tasks`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

export async function createTask(formData: FormData) {
  const title = formData.get('title') as string;
  await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  revalidatePath('/');
}

export async function toggleTask(id: number, completed: boolean) {
  await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  });
  revalidatePath('/');
}

export async function deleteTask(id: number) {
  await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
  revalidatePath('/');
}
