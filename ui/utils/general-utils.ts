export const randomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = 'a';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
export const isLocator = (param: any): boolean =>{
  const hasLocatorProps:boolean = typeof param.nth == 'function';
  const hasPageProps:boolean = typeof param.goto == 'function';
  return hasLocatorProps && ! hasPageProps
}

