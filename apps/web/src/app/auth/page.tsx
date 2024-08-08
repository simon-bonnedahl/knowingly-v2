"use client"
import { Authenticated, Unauthenticated } from "convex/react";
export default function AuthRootPage () {

    
  return (
    <div>
        <Authenticated>
            <h1>Authenticated</h1>
        </Authenticated>
        <Unauthenticated>
            <h1>Unauthenticated</h1>
        </Unauthenticated>
    </div>
  )
}