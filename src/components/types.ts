export type Todo = {
    value: string;
    readonly id: number;
    checked: boolean;
    deleted: boolean;
    createdAt: Date;
  };
  
  export type Filter = 'all' | 'checked' | 'unchecked' | 'deleted' ;
  