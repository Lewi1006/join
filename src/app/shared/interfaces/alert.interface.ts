export interface Alert {
    message: string;
    type: AlertType;
    duration: number;
}

// https://angular.dev/cli/generate/enum
// define a set of named constants
export enum AlertType {
    Success = 'success',
    Error = 'error',
    Warning = 'warning',
}
