import { Service } from '@angular/core';

@Service()
export class TaskDetailServive{

     getPriorityIcon(priority?: string): string {
        switch (priority) {
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
    
}
