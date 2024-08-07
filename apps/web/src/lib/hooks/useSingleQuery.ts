import { useQuery } from "convex/react";
import {  useEffect, useState } from "react";


export const useSingleQuery = ((name, ...args) => {
  const [data, setData] = useState();

  const result = useQuery(name, ...(data ? ["skip"] : args));

  useEffect(() => {
    if (result !== undefined) {
      setData(result);
    }
  }, [result]);

  return data;
}) as typeof useQuery; // make sure we match the useQuery signature & return type
