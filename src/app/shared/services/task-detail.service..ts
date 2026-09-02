import { Injectable,} from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { Contact } from '../interfaces/contact.interface';

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



    getAssignees(task: Task): Contact[]{
        if(task.assignees){
            return task.assignees;
        }

        return [];
    }
    

    getDisplayedAssignees(task: Task): Contact[]{
        const assignees = this.getAssignees(task);

        const displayed = assignees.slice(0,3);

        return displayed;
    }


    getRemainingAssigneeCount(task:Task): number{
        const assignees = this.getAssignees(task);

        if(assignees.length > 3){
            return assignees.length -3;
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
