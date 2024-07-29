
export const capitalize = (s: string) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  
  export const capitalizeFirstLetter = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  }
  
  export const truncate = (str: string, num: number) => {
    if (!str) return "";
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };