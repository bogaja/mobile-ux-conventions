// Test fixture for the mobile-ux-conventions skill (web checks).
// A small Next.js learning dashboard with problems planted on purpose.
// The route folder has no loading.tsx and no error.tsx.
// It is review material only. Do not use it as a starting point for an app.
'use client';
import Link from 'next/link';
import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { uploadFile } from './upload';

export const viewport = { viewportFit: 'cover', maximumScale: 1 };

const gutter = 'pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:px-6';

export function AppShell({ children, role }: { children: React.ReactNode; role: 'student' | 'teacher' }) {
  return (
    <div className="min-h-dvh">
      <header className={`flex h-14 items-center ${gutter}`}>
        <Link href="/">
          <img src="/logo.svg" alt="Acme Academy" className="h-7" />
        </Link>
      </header>
      <main className={gutter}>{children}</main>
      {role === 'teacher' && (
        <nav className="fixed inset-x-0 bottom-0 flex h-12 lg:hidden">
          <Link href="/app/lessons" className="flex-1 text-[11px]">Lessons</Link>
          <Link href="/app/students" className="flex-1 text-[11px]">Students</Link>
        </nav>
      )}
    </div>
  );
}

export function LessonList({ lessons, failed }: { lessons: { id: string; title: string }[]; failed: boolean }) {
  if (failed) return <p>Something went wrong. Please reload the page.</p>;
  return (
    <ul>
      {lessons.map((l) => (
        <li key={l.id}>
          <Link href={`/app/lessons/${l.id}`}>{l.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export function UploadSheet() {
  const [open, setOpen] = useState(false);
  const [percent, setPercent] = useState<number | null>(null);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="h-11 px-4">Add material</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed inset-x-0 bottom-0 max-h-[92vh] rounded-t-2xl bg-white p-4">
          <Dialog.Title>Add material</Dialog.Title>
          <input type="file" onChange={(e) => uploadFile(e.target.files![0], setPercent)} />
          {percent !== null && <progress value={percent} max={100} />}
          <Dialog.Close className="size-6">×</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
