import React from 'react'
import { signIn } from 'next-auth/react'
export default function loginUser() {
  return (
    <div>
      <button onClick={() => signIn('google')}>LOGIN</button>
    </div>
  )
}
