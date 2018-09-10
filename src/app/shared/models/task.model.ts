export class Task {
  id?: number;
  name?: string;
  priority?: number;
  completed?: boolean;

  constructor(name?: string, priority?: number){
    this.id = new Date().getTime();
    this.name = name;
    this.priority = priority;
  }

}
