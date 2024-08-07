
import { useQuery } from 'convex/react'
import { useRef, useState } from 'react'

export const useSingleQuery = ((name, ...args) => {

  const [data, setData] = useState()

  const result = useQuery(name, data ?  ...args : "skip")


	// useRef() creates an object that does not change between re-renders
  // stored.current will be result (undefined) on the first render
  const stored = useRef(result) 

	// After the first render, stored.current only changes if I change it
  // if result is undefined, fresh data is loading and we should do nothing
  if (result !== undefined) {
    // if a freshly loaded result is available, use the ref to store it
    stored.current = result
  }

  // undefined on first load, stale data while reloading, fresh data after loading
  return stored.current
}) as typeof useQuery // make sure we match the useQuery signature & return type
