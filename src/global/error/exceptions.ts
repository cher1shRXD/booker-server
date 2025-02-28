export const CustomException = {
  unauthorized: () => {
    return new Error("401");
  },
  
  forbidden: () => {
    return new Error("403");
  },
  
  notFound: () => {
    return new Error("404");
  },
  
  conflict: () => {
    return new Error("409");
  },
}