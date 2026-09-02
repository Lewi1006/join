import { Injectable,} from '@angular/core';
import { Task } from '../interfaces/task.interface';

@Injectable({
    providedIn: 'root',
})

export class TaskDetailService{

    getSubtaskCount(task: Task): number{
        if (task.subtasks?.length){
            return task.subtasks.length;
        }
        
        return 0;
    }



     getPriorityIcon(priority?: string): string {
        switch (priority?.toLowerCase()) {
            case 'low':
                return 'icons/priority-low.svg';

            case 'medium':
                return 'icons/priority-medium.svg';

            case 'high':
                return 'icons/priority-high.svg';

            default:
                return '';
        }
    }

    getCategory(category?: string):string{
        switch(category?.toLowerCase()){
            case 'user story':
            return 'user-story';

            case 'technical task':
                return 'technical-task'

            default:
                return '';
        }
    }
    
}
