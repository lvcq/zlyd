export interface FormItem {
  value: string;
  error: boolean;
  help: string;
  validate: (arg0: string) => boolean;
}

export interface FetchErrorInfo{
  code:number;
  msg:string;
}
