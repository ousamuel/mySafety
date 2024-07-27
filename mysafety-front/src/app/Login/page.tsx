'use client'
import { useSession, signOut, signIn} from 'next-auth/react'
import React from 'react'
export default function login() {
  const session = useSession();
  return (
    <div>
      <div>
      <button onClick={() => signIn('google')}>LOGIN</button>
    </div>
      <div>{session?.data?.user?.name}</div>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}
